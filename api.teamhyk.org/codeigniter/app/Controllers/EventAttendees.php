<?php
namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\EventAttendeesModel;

class EventAttendees extends ResourceController
{
    use ResponseTrait;

    public $eventAttendeeModel;

    public function __construct(){
        $this->eventAttendeeModel = new EventAttendeesModel();
    }

    public function create(){
        $data = [
            'firstname' => $this->request->getVar('firstname'),
            'lastname' => $this->request->getVar('lastname'),
            'phone_number' => $this->request->getVar('phone_number'),
            'email_address' => $this->request->getVar('email_address'),
            'referal' => $this->request->getVar('referal'),
            'created_at' => date('Y-m-d H:i:s')
        ];

        if($this->eventAttendeeModel->insert($data)){
            $response = [
                'status' => 201,
                'error' => null,
                'message' => [
                    'success' => 'Customer Created'
                ]
            ];
            return $this->respondCreated($response);
            
        }
    }
}


?>