
import DbConnect from './DbConnect';

/**
 * Represents the meal/menu model.
 */
class MenuModel extends DbConnect {
  /**
       * This function add user data into the database
       * @param {object} data - the req.body object .
       * @returns {Promise} Returns the queried data .
       */
  postMenu(data) {
    const name = data.menuName;
    const price = data.menuPrice;
    const category = data.menuCategory;
    const image = data.menuImage;
    const sql = `INSERT INTO 
        menu(menu_name, menu_price, menu_category, menu_image) 
        VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [name, price, category, image];
    return this.pool.query(sql, params);
  }

  /**
       * This function add user data into the database
       * @returns {Promise} Returns all menu available.
       */
  getAllMenu() {
    const sql = 'SELECT * FROM menu';
    return this.pool.query(sql);
  }
}
export default MenuModel;