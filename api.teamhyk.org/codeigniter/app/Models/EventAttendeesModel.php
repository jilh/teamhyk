<?php
namespace App\Models;
use CodeIgniter\Model;

class EventAttendeesModel extends Model{
    protected $table = 'event_attendees';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'firstname',
        'lastname',
        'phone_number',
        'email_address',
        'referral',
        'created_at',
        'updated_at'
    ];
}

?>