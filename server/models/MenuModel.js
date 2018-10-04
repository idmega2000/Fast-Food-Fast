
import DbConnect from './DbConnect';

/**
 * Represents the meal/menu model.
 */
class MenuModel extends DbConnect {
  /**
       * This function adds a menu to the database
       * @param {object} reqData - the req.body object .
       * @returns {Promise} Returns the queried data .
       */
  postMenu(reqData) {
    const data = reqData.body;
    const name = data.menuName;
    const price = data.menuPrice;
    const category = data.menuCategory;
    const image = reqData.menuFileName;
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
    const sql = 'SELECT * FROM menu';
    return this.pool.query(sql);
  }
}
export default MenuModel;
