import { Router } from 'express';
import { StatusCodes } from '../common';
import {
  /* createCard,
  deleteCard, */
  getCardByName,
  getCards,
  /*  updateCard, */
} from './repository';
import { Card } from './card';
import { getCategoryByName } from '../category/repository';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await getCards();
    return res.json(data);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

router.get('/:name', async (req, res) => {
  try {
    const data = await getCardByName(req.params.name);
    if (!data) return res.sendStatus(StatusCodes.NotFound);
    return res.json(data);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

// router.delete('/:name', async (req, res) => {
//   try {
//     await deleteCard(req.params.name);
//     return res.sendStatus(StatusCodes.Ok);
//   } catch (e) {
//     return res.status(StatusCodes.NotFound).send(e);
//   }
// });

// router.post('/', async (req, res) => {
//   const data = req.body as Card;
//   const category = await getCategoryById(data.categoryId);
//   if (!category) {
//     return res.status(StatusCodes.BadRequest).send('Invalid category ID');
//   }
//   try {
//     const newData = await createCard(data);
//     return res.json(newData);
//   } catch (e) {
//     return res.status(StatusCodes.BadRequest).send(e);
//   }
// });

// router.put('/', async (req, res) => {
//   const data = req.body as Card;
//   const category = await getCategoryById(data.categoryId);
//   if (!category) {
//     return res.status(StatusCodes.BadRequest).send('Invalid category ID');
//   }
//   try {
//     const newData = await updateCard(data);
//     return res.json(newData);
//   } catch (e) {
//     return res.status(StatusCodes.BadRequest).send(e);
//   }
// });

export default router;