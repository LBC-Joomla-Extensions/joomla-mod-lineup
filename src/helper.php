
<?php 
/*Este archivo puede considerarse el modelo (MVC) del módulo*/

defined("_JEXEC") or die; 

require_once __DIR__ . "\\vendor\\autoload.php";

use Dickinsonjl\Lorum\Lorum;

class modLineUp{

    public static function getArticulos(&$params){
        $db = JFactory::getDbo();
        $id = $params["categoria"];

        $query = $db->getQuery(true);
        $query->select('*');
        $query->from('#__content');
        $query->where('catid="'.$id.'" AND state="1"' );

        $db->setQuery((string)$query);
        $res = $db->loadObjectList();

        return $res;
    }
    
}
?>