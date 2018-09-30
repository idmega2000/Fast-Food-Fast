import DbConnect from '../models/DbConnect';

const dbModels = new DbConnect();

/**
     * This is a recursive function that arranges the menuList
     * of orders to include menu name and price
     * @param {object} count - the count integer.
     * @param {object} menuItmes - the order menu details.
     * @param {object} newARrayData - holds an array of menu Data of orders.
     * @param {object} menuTPrice - saves the total price of the whole menu.
     * @param {object} req - The response object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns error if error or move to next middleware
     */
const organiseEachMenu = (
  count,
  menuItmes,
  newARrayData,
  menuTPrice,
  req, res, next
) => {
  const aMenuId = menuItmes[count].menuId;
  const aMenuQuantity = menuItmes[count].quantity;
  const sql = 'SELECT * FROM menu WHERE menu_id = $1';
  const param = [aMenuId];
  dbModels.pool.query(sql, param)
    .then((result) => {
      if (result.rowCount > 0) {
        const menuName = result.rows[0].menu_name;
        const menuPrice = result.rows[0].menu_price;
        const menuId = result.rows[0].menu_id;
        menuItmes[count].menu_name = menuName;
        menuItmes[count].a_menu_price = menuPrice;
        menuItmes[count].all_menu_price = aMenuQuantity * menuPrice;
        menuTPrice += menuItmes[count].all_menu_price;
        newARrayData.push({
          menu_id: menuId,
          quantity: aMenuQuantity,
          a_menu_price: menuPrice,
          all_menu_price: (aMenuQuantity * menuPrice)
        });
        if (count === menuItmes.length - 1) {
          req.menuCart = newARrayData;
          req.menutoTotal = menuTPrice;
          return next();
        }
        return organiseEachMenu(
          count + 1,
          menuItmes,
          newARrayData,
          menuTPrice,
          req,
          res,
          next,
        );
      }
      return res.status(400)
        .json({
          status: 'failed',
          error: (`Menu Id ${aMenuId} is not a valid menu Id`)
        });
    });
};


/**
     * This function is a middleware call on the
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages if error
     */
const organiseOrderedMenuList = (req, res, next) => {
  const menuItmes = req.body.menuData;
  const count = 0;
  const newARrayData = [];
  const menuTPrice = 0;
  organiseEachMenu(count, menuItmes, newARrayData, menuTPrice, req, res, next);
};
export default organiseOrderedMenuList;
