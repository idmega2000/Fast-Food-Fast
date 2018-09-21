export const postOrderValidator = (req, res, next) => {

    const textInput = req.body;
    const orderFoodName = textInput.foodName;
    const orderFoodPrice = textInput.foodPrice;
    let orderFoodImage = textInput.foodImage;
 
    if(!orderFoodName || !orderFoodPrice){
      return res.status(400).json({ error: 'All field are required'});
    }
    else if(orderFoodName.trim().length === 0 || orderFoodPrice.trim().length === 0){
      return res.status(400).json({ error: 'Please fill all field'});
    }
return next()
}


