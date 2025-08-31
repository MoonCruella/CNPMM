import express, { Application, Request, Response } from "express";
import homeController from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app: Application): void => {
  // cách 1:
  router.get('/', (req: Request, res: Response) => {
    return res.send('Phạm Ngọc Hòa');
  });
  // cách 2: gọi hàm trong controller
  router.get('/home', homeController.getHomePage);
  router.get('/about', homeController.getAboutPage);
  router.get('/crud', homeController.getCRUD);
  router.post('/post-crud', homeController.postCRUD);
  router.get('/get-crud', homeController.getFindAllCrud);
  router.get('/edit-crud', homeController.getEditCRUD);
  router.post('/put-crud', homeController.putCRUD);
  router.get('/delete-crud', homeController.deleteCRUD);
  app.use("/", router);
};

export default initWebRoutes;