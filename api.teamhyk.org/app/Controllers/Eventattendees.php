<?php
namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\EventAttendeesModel;

class Eventattendees extends ResourceController
{
    use ResponseTrait;

    public $eventAttendeeModel;

    public function __construct(){
        $this->eventAttendeeModel = new EventAttendeesModel();
    }

    public function index(){
        echo "Welcome";
    }

    public function show($id = null){

    }

    public function create(){

        $rules = [
            'firstname' => 'required|alpha',
            'lastname' => 'required|alpha',
            'phone_number' => 'required|exact_length[11]|is_natural',
            'email_address' => 'required|valid_email|is_unique[event_attendees.email_address]|min_length[6]',
            'referral' => 'required',
        ];

        $messages = [
            'firstname' => [
                'required' => 'You forgot a firstname',
                'alpha' => 'Only alphabets allowed',
            ],
            'lastname' => [
                'required' => 'You forgot a lastname',
                'alpha' => 'Only alphabets allowed',
            ],
            'phone_number' => [
                'required' => 'You forgot phone number',
                'exact_length' => 'Phone number must be exactly 11 characters',
                'is_natural' => 'Number is required in this field',
            ],
            'email_address' => [
                'required' => 'You forgot email address',
                'valid_email' => 'This email is invalid',
                'is_unique' => 'You are already registered for the event',
                'min_length' => 'This email does not look valid',
            ],
            'referral' => [
                'required' => 'Please select an option from the list',
            ]
         ];

         if(!$this->validate($rules, $messages)){
            
            return $this->failValidationErrors($this->validator->getErrors());

         }else{
            $data = [
                'firstname' => $this->request->getVar('firstname'),
                'lastname' => $this->request->getVar('lastname'),
                'phone_number' => $this->request->getVar('phone_number'),
                'email_address' => $this->request->getVar('email_address'),
                'referral' => $this->request->getVar('referral'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ];
    
            if($this->eventAttendeeModel->insert($data)){
                
                $email = \Config\Services::email();
                $email->setFrom('no-reply@teamhyk.org', 'TeamHyk');
                $email->setTo($data['email_address']);
                $email->setSubject('TeamHyk Event Confirmation');
                $email->setMessage(view('App\Views\email.html'));
                $email->send();

                $response = [
                    'status' => 200,
                    'error' => null,
                    'message' => [
                        'success' => 'Thanks! Your registration is successful'
                    ]
                ];
                
                return $this->respondCreated($response);                
            }
         }
    }
}


?>