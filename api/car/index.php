<?php
require 'vendor/autoload.php';
require 'database/ConnectionFactory.php';
require 'carts/CartService.php';
$app = new \Slim\Slim();
$app->get('/carts/', function() use ($app)
{
    $carts = CarService::listCarts();
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($carts);
});
$app->post('/carts/', function() use ($app)
{
    $cartJson = $app->request()->getBody();
    $newCart = json_decode($cartJson, true);
    
    if($newCart) 
    {
        $app->response()->header('Content-Type','application/json');
        $cart = CarService::add($newCart);
        $result = array('description'=>'This is a test','qtd'=>'1','price'=>'1','id'=>$cart['id']);
        
        echo json_encode($result);
    }
    else 
    {
        $app->response->setStatus(400);
        echo "Not possible save :(";
    }
});
$app->delete('/carts/:id', function($id) use ($app)
{
    $app->response()->header('Content-Type','application/json');
    $result;
    
    if(CarService::delete($id)) 
    {
      $result = array('status'=>'true','message'=>'Cart deleted!');
    }
    else
    {
      $app->response->setStatus('404');
      $result = array('status'=>'false','message'=>'Cart with ' .$id .' does not exit');
    }
    
    echo json_encode($result);
});
$app->run();
?>