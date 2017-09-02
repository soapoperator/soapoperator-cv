<?php

require_once('pushbullet-token.php');

// Suivant le type de push
if(isset($_POST['type']) && !empty($_POST['type'])) {
    $type = $_POST['type'];
    switch($type) {
        case 'note' : pb_note($_POST); break;
        case 'link' : pb_link($_POST); break;
        case 'file' : pb_file($_POST); break;
    };
};

// Pour les notes
function pb_note($data){

    // Content
    $id = $data['name'];
    $contact = ( strpos($data['contact'], '@') !== false ) ? filter_var($data['contact'], FILTER_SANITIZE_EMAIL) : $data['contact'];
    
    // Parameters
    $lien = 'https://api.pushbullet.com/v2/pushes';
    $postfields = array(
        //'device_iden'     =>    mobile,
        'type'            =>    'note',
        'title'           =>    '--- contact @ cv.soapoperator.com ---' ,
        'body'            =>    'Contact : ' . $id . ' < ' . $contact . ' >',
    );

    // Request
    // https://www.dewep.net/realisations/utiliser-curl-php
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $lien);
    curl_setopt($curl, CURLOPT_COOKIESESSION, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, ['Authorization: Bearer '. token .'']);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $postfields);
    // UN-COMMENT TO BYPASS THE SSL VERIFICATION IF YOU DON'T HAVE THE CERT BUNDLE (NOT RECOMMENDED).
    // curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($curl);
    curl_close($curl);

    $custom = array( 'name' => ucwords($id) );

    // Add custom value to the response
    $feedback['reponse'] = json_decode($response,true);
    $feedback['custom'] = $custom;

    header('content-type:application/json');
    echo json_encode($feedback);
};

// Pour les liens
function pb_link($data){
    // Silence
};

// Pour les fichiers
function pb_file($data){
    // Silence
};

?>
