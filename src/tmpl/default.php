<?php

defined("_JEXEC") or die;

$doc=JFactory::getDocument();

$doc->addStyleSheet(JURI::base() . "./modules/mod_lineup/css/main.css");
$doc->addScript(JURI::base() . "./modules/mod_lineup/js/main.js","text/javascript");

//$idCategoria=$params['categoria'];
require_once __DIR__ . "/../helper.php";

//Obtiene los parametros pasados por el metodo
$list=modLineUp::getArticulos($params);
$res=array();

$titulos=array();
$imagenes=array();




echo "<div id='lineup-outer-wrapper' class='lineup-outer-wrapper' style='color:white;'>
        <div id='lineup-header' class='lineup-header'>";

            $i=0;
            foreach($list as $l){
                $aux=json_decode($l->images);
                $titulos[$i]=$aux->image_fulltext_caption;
                $imagenes[$i]=$aux->image_fulltext;
                $i++;
            }

            $activo=" activo ";

            for($j=0;$j<$i;$j++){
                echo "<h3 class='" . $activo . " lineup-header-item' data-index='" . $j . "' onclick='cambiaImagen(" . $j . ")'>" . $titulos[$j] . "</h3>";            
                $activo="";
            }

echo "  </div>";            
echo "  <div id='lineup-showbox' class='lineup-inner-wrapper'>";

            $activo=" activo ";
            for($j=0;$j<$i;$j++){
                echo "<img id='lineup-imagen-" . $j . "' class='lineup-imagen " . $activo ."' data-index='" . $j . "' src='" . JURI::base() . "./" . $imagenes[$j] . "' onload='imagenCargada(". $j . ")' />";
                $activo="";
            } 

echo "  </div>        
    </div>
    <script>        
        window.addEventListener('resize', redimensionar);
    </script>
    ";
?>
