<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "labiblioteca";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);


// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultarusuario"])){
    $sqlUsuario = mysqli_query($conexionBD,"SELECT * FROM usuario WHERE cedula=".$_GET["consultarusuario"]);
    if(mysqli_num_rows($sqlUsuario) > 0){
        $usuario = mysqli_fetch_all($sqlUsuario,MYSQLI_ASSOC);
        echo json_encode($usuario);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

if (isset($_GET["consultarlibro"])){
    $sqlLibro = mysqli_query($conexionBD,"SELECT * FROM libros WHERE id=".$_GET["consultarlibro"]);
    if(mysqli_num_rows($sqlLibro) > 0){
        $libro = mysqli_fetch_all($sqlLibro,MYSQLI_ASSOC);
        echo json_encode($libro);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}



//borrar pero se le debe de enviar una clave ( para borrado del libro)
if (isset($_GET["borrarlibro"])){
    $sqlLibro = mysqli_query($conexionBD,"DELETE FROM libros WHERE id=".$_GET["borrarlibro"]);
    if($sqlLibro){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado del usuario)
if (isset($_GET["borrarusuario"])){
    $sqlUsuario = mysqli_query($conexionBD,"DELETE FROM usuario WHERE cedula=".$_GET["borrarusuario"]);
    if($sqlUsuario){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}


//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertarusuario"])){
    $data = json_decode(file_get_contents("php://input"));
    $cedula=$data->cedula;
    $nombre=$data->nombre;
    $apellido=$data->apellido;
    $correo=$data->correo;
    $telefono=$data->telefono;

    if(($cedula!="")&&($nombre!="")&&($apellido!="")&&($correo!="")&&($telefono!="")){
            
    $sqlUsuarios = mysqli_query($conexionBD,"INSERT INTO usuario(cedula,nombre,apellido,correo,telefono) VALUES('$cedula','$nombre','$apellido','$correo','$telefono') ");
    echo json_encode(["success"=>1]);
    }
    exit();
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertarlibro"])){
    $data = json_decode(file_get_contents("php://input"));
    $titulo=$data->titulo;
    $anio=$data->anio;
    $autor=$data->autor;
    $categoria=$data->categoria;
    $edicion=$data->edicion;
    $idioma=$data->idioma;
    $paginas=$data->paginas;
    $descripcion=$data->descripcion;
    $ejemplares=$data->ejemplares;

    if(($titulo!="")&&($anio!="")&&($autor!="")&&($categoria!="")&&($edicion!="")&&($idioma!="")&&($paginas!="")&&($descripcion!="")&&($ejemplares!="")){
            
    $sqlLibros = mysqli_query($conexionBD,"INSERT INTO libros(titulo,anio,autor,categoria,edicion,idioma,paginas,descripcion,ejemplares) VALUES('$titulo','$anio','$autor','$categoria','$edicion','$idioma','$paginas','$descripcion','$ejemplares') ");
    echo json_encode(["success"=>1]);
    }
    exit();
}

//insertar reporte
if(isset($_GET["insertarreporte"])){
    $data = json_decode(file_get_contents("php://input"));
    $cedula = $data->cedula;
    $id_libro = $data->id_libro;
    $fecha_salida = date('Y-m-d H:i:s');
    //creo una variable para guardar el numero
    $numero=0;
    //extraigo la consulta en una variable
    $ejemplares = mysqli_query($conexionBD,"SELECT ejemplares FROM libros where id = '$id_libro'");
    //utilizo un while para extraer la variable de la consulta y guardarla en la variable
    while($row = mysqli_fetch_assoc($ejemplares)){
        $numero = $row['ejemplares'];
    }
    //consulto si existen numeros de libros para poder prestar
    if($numero > 0){
        //le resto a los ya existentes
        $nuevo_ejemplar = $numero-1;
        if(($cedula!="")&&($id_libro!="")){
            //inserto los datos del prestamo en la tabla
            $sqlReportes = mysqli_query($conexionBD,"INSERT INTO reportes(cedula,id_libro,fecha_salida) VALUES('$cedula','$id_libro','$fecha_salida')");
            echo json_encode(["success"=>1]);
             //le actualizo la tabla con lo que queden aun
            $sqlReductor = mysqli_query($conexionBD,"UPDATE libros SET ejemplares='$nuevo_ejemplar' WHERE id='$id_libro'");
        }
    }
    exit();
}
//insertar devolucion
if(isset($_GET["insertardevolucion"])){
    $data = json_decode(file_get_contents("php://input"));
    $cedula = $data->cedula;
    $id_libro = $data->id_libro;
    $fecha_entrega = date('Y-m-d H:i:s');

    $numero=0;
    $ejemplares = mysqli_query($conexionBD,"SELECT ejemplares FROM libros where id = '$id_libro'");
    while($row = mysqli_fetch_assoc($ejemplares)){
        $numero = $row['ejemplares'];
    }
    $nuevo_ejemplar = $numero+1;
    if(($cedula!="")&&($id_libro!="")){
        $sqlReportes = mysqli_query($conexionBD,"INSERT INTO reportes(cedula,id_libro,fecha_entrega) VALUES('$cedula','$id_libro','$fecha_entrega')");
        echo json_encode(["success"=>1]);
        $sqlReductor = mysqli_query($conexionBD,"UPDATE libros SET ejemplares='$nuevo_ejemplar' WHERE id='$id_libro'");
    }
    exit();
}


// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizarusuario"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $cedula=(isset($data->cedula))?$data->cedula:$_GET["actualizarusuario"];
    //$cedula=$data->cedula;
    $nombre=$data->nombre;
    $nombre=$data->nombre;
    $apellido=$data->apellido;
    $correo=$data->correo;
    $telefono=$data->telefono;
    
    $sqlEmpleaados = mysqli_query($conexionBD,"UPDATE usuario SET /*cedula='$cedula',*/ nombre='$nombre',apellido='$apellido',correo='$correo',telefono='$telefono' WHERE cedula='$cedula'");
    echo json_encode(["success"=>1]);
    exit();
}
if(isset($_GET["actualizarlibros"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizarlibros"];
    $titulo=$data->titulo;
    $anio=$data->anio;
    $autor=$data->autor;
    $categoria=$data->categoria;
    $edicion=$data->edicion;
    $idioma=$data->idioma;
    $paginas=$data->paginas;
    $descripcion=$data->descripcion;
    $ejemplares=$data->ejemplares;
    
    $sqlLibros = mysqli_query($conexionBD,"UPDATE libros SET titulo='$titulo',anio='$anio',autor='$autor',categoria='$categoria',edicion='$edicion',idioma='$idioma',paginas='$paginas',descripcion='$descripcion',ejemplares='$ejemplares' WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}

//Aqui se va a crear un metodo con el cual extrear los datos de una sola tabla
if(isset($_GET["verusuario"])){
    $sqlUsuarios = mysqli_query($conexionBD,"SELECT * FROM usuario");
    if(mysqli_num_rows($sqlUsuarios) > 0){
        $usuarios = mysqli_fetch_all($sqlUsuarios,MYSQLI_ASSOC);
        echo json_encode($usuarios);
    }
    else{ echo json_encode([["success"=>0]]); }
}

if(isset($_GET["verlibro"])){
    $sqlLibros = mysqli_query($conexionBD,"SELECT * FROM libros");
    if(mysqli_num_rows($sqlLibros) > 0){
        $libros = mysqli_fetch_all($sqlLibros,MYSQLI_ASSOC);
        echo json_encode($libros);
    }
    else{ echo json_encode([["success"=>0]]); }
}

if(isset($_GET["verreporte"])){
    $sqlReportes = mysqli_query($conexionBD,"SELECT * FROM reportes");
    if(mysqli_num_rows($sqlReportes) > 0){
        $reportes = mysqli_fetch_all($sqlReportes,MYSQLI_ASSOC);
        echo json_encode($reportes);
    }
    else{ echo json_encode([["success"=>0]]); }
}

?>
