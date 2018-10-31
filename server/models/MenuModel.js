
import DbConnect from './DbConnect';

/**
 * Represents the meal/menu model.
 */
class MenuModel extends DbConnect {
  /**
       * This function adds a menu to the database
       * @param {object} data - the req.body object .
       * @returns {Promise} Returns the queried data .
       */
  postMenu(data) {
    const name = data.menuName;
    const price = data.menuPrice;
    const category = data.menuCategory;
    const image = data.menuImage || 'https://res.cloudinary.com/dr4yibvoq/image/upload/v1539037405/defaultimage.png';
    const sql = `INSERT INTO 
        menu(menu_name, menu_price, menu_category, menu_image) 
        VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [name, price, category, image];
    return this.pool.query(sql, params);
  }

  /**
       * This function gets all menu from database
       * @returns {Promise} Returns all menu available.
       */
  getAllMenu() {
    const deleteFalse = false;
    const sql = 'SELECT * FROM menu WHERE menu_deleted = $1';
    const param = [deleteFalse]
    return this.pool.query(sql, param);
  }

  /**
       * This function deletes a menu
       * @param {object} menuId - the menuId to be deleted.
       * @returns {Promise} Returns the queried data .
       */
  deleteMenu(menuId) {
    const dateTrue = true;
    const sql = `UPDATE menu SET
                  menu_deleted = $1 
                  WHERE menu_id = $2 
                  RETURNING *`;
    const params = [dateTrue, menuId];
    return this.pool.query(sql, params);
  }


  /**
       * This function deletes a menu
       * @param {object} data - the req.body object.
       * @param {integer} menuId - the menuId to be updated
       * @returns {Promise} Returns the queried data .
       */
  upadateMenu(data, menuId) {
    const name = data.menuName;
  }
}
export default MenuModel;
