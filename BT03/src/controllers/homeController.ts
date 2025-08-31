import { Request, Response } from 'express';
import db from '../models/index';
import CRUDService from '../services/CRUDService';

// hàm getHomePage
const getHomePage = async (req: Request, res: Response) => {
    try {
        const data = await db.User.findAll();
        console.log('....');
        console.log(data);
        console.log('......');
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
};

// hàm getAbout
const getAboutPage = (req: Request, res: Response) => {
    return res.render('test/about.ejs');
};

// hàm CRUD
const getCRUD = (req: Request, res: Response) => {
    return res.render('crud.ejs');
};

// hàm findAll CRUD
const getFindAllCrud = async (req: Request, res: Response) => {
    const data = await CRUDService.getAllUser();
    return res.render('users/findAllUser.ejs', {
        datalist: data
    });
};

// hàm post CRUD
const postCRUD = async (req: Request, res: Response) => {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('Post crud to server');
};

// hàm lấy dữ liệu để edit
const getEditCRUD = async (req: Request, res: Response) => {
    const userId = req.query.id as string;
    if (userId) {
        const userData = await CRUDService.getUserInfoById(userId);
        return res.render('users/editUser.ejs', {
            data: userData
        });
    } else {
        return res.send('không lấy được id');
    }
};

const putCRUD = async (req: Request, res: Response) => {
    const data = req.body;
    const data1 = await CRUDService.updateUser(data);
    return res.render('users/findAllUser.ejs', {
        datalist: data1
    });
};

const deleteCRUD = async (req: Request, res: Response) => {
    const id = req.query.id as string;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Deleted!!!!!!!!!!!!');
    } else {
        return res.send('Not find user');
    }
};

export default {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    getFindAllCrud,
    getEditCRUD,
    putCRUD,
    deleteCRUD
};