<?php
class CartService 
{
    public static function listCarts() 
    {
        $db = ConnectionFactory::getDB();
        $carts = array();
        
        foreach($db->carts() as $carts) 
        {
           $carts[] = array (
               'id' => $carts['id'],
               'license_plate' => $carts['license_plate'],
               'checkin' => $carts['checkin'],
               'checkout'=> $carts['checkout']
           ); 
        }
        
        return $carts;
    }
    
    
    public static function add($newCart)
    {
        $db = ConnectionFactory::getDB();
        $cart = $db->carts->insert($newCart);
        return $cart;
    }
    
    
    public static function delete($id)
    {
        $db = ConnectionFactory::getDB();
        $cart = $db->carts[$id];
        
        if($cart)
        {
            $cart->delete();
            return true;
        }
        return false;
    }
}
?>