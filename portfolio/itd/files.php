<?php 

    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
        move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $_FILES['file']['name']);
    }
move_uploaded_file(

    // временное расположение файла
    $_FILES['file']['tmp_name'],

    // конечный путь к файлу и его название
    'uploads/' . $_FILES['file']['name']
);

move_uploaded_file(
    $_FILES['file']['tmp_name'],
    'uploads/my_new_filename.whatever'
);

?>