<?php
namespace App\Models;
use CodeIgniter\Model;

class EventAttendeesModel extends Model{
    protected $table = 'event_attendees';
    protected $primaryKey = 'id';
    protected $allowFields = [
        'firstname',
        'lastname',
        'phone_number',
        'email_address',
        'referal',
        'created_at'
    ];
}

?>