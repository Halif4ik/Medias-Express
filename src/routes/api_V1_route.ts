import {checkValidationInMiddleWare, idValid, postIdValidMid, textValidMiddleware} from "../midleware/validator";
import {Commit, Customer, Post} from '../models/modelsDb';
import {Op} from "sequelize";
import express, {Express, NextFunction, Request, Response, Router} from 'express';
import * as fs from "fs";

const PAGE_PAGINATION: number = process.env.PAGE_PAGINATION ? parseInt(process.env.PAGE_PAGINATION) : 5;

const router: Router = express.Router();



/*create new Post  todo isCorrectToken,*/
router.post('/', textValidMiddleware(), checkValidationInMiddleWare, async (req:Request, res) => {
    if (!req.session.isAuthenticated || !req.session.customer) {
        console.log('create new task Error');
        return res.send({error: 'forbidden'});
    }

    try {
        const postItem: Post[] = await Post.bulkCreate([{
            checked: req.body.done === 'true',
            text: req.body.text,
            CustomerId: req.session.customer[0].id,
            attachedFile: '',
            login: req.session.customer[0].login,
            userName: req.session.customer[0].userName,
            face: req.session.customer[0].face,
        }]);
        res.status(201).send(postItem[0]);
    } catch (e) {
        if (e === 'writeErr') {
            console.error('Error writing resized image: writeErr');
            return res.sendStatus(500);
        }
        console.log(e);
        res.sendStatus(404)
    }
});

interface IResult {
    [key: string]: boolean
}


async function gettingAllPosts(needPage: string | any, revert: string | any, whereParams = null) {
    if (!needPage || isNaN(parseInt(needPage)) || needPage === '0') needPage = '1'
    needPage = parseInt(needPage);
    const order = revert === 'true' ? 'ASC' : 'DESC';
    const posts: Post[] = await Post.findAll({
        where: whereParams ? whereParams : {},
        include: {
            association: 'Commits',
            include: [
                {
                    model: Commit,
                    as: 'Children',
                    attributes: ['id', 'CustomerId', 'text', 'createdAt', 'attachedFile', 'checkedCom']
                },
                {
                    model: Commit,
                    as: 'Parent',
                    attributes: ['id', 'post_id', 'text']
                }
            ]
        },
        order: [
            ['id', order],
        ],
        limit: PAGE_PAGINATION,
        offset: PAGE_PAGINATION * (parseInt(needPage) - 1),
    });


    return posts;
};
export {router as apiV1Route};
