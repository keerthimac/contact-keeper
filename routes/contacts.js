const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

//@route    GET api/contacts
//@desc     Get all users contacts
//@access   Private

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error!!!');
  }
});

//@route    POST api/contacts
//@desc     Add new contact
//@access   Private

router.post('/', [auth, [check('name', 'Name is required').not().isEmpty()]], async (req, res) => {
  // console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //if validation passed -- reference express validator
  const { name, email, phone, type } = req.body;

  try {
    newContact = new Contact({
      name: name,
      email: email,
      phone: phone,
      type: type,
      user: req.user.id,
    });

    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error!!!');
  }
});

//@route    PUT api/contacts
//@desc     Update contact
//@access   Private

router.put('/:id', auth, async (req, res) => {
  // res.send('success');
  // console.log(req.params);

  const { name, email, phone, type } = req.body;
  //Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    // console.log(req.param);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    //make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });
    // console.log(contact);
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error!!!');
  }
});

//@route    DELETE api/contacts
//@desc     Update contact
//@access   Private

router.delete('/:id', auth, async (req, res) => {
  // res.send('Delete contacts');

  try {
    let contact = await Contact.findById(req.params.id);
    // console.log(req.param);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    //make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error!!!');
  }
});

module.exports = router;
