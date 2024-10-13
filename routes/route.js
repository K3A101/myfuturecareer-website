const { Resend } = require('resend');
const express = require("express");
const router = express.Router();

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('services')
        .select()
    if (error) {
        return res.status(500).send('Error fetching services');
    }

    res.render('index', {
        title: "My Future Career | Adviesbureau",
        services: data,
    })
})

router.post('/confirmation', async (req, res) => {
    const { error } = await supabase
        .from('posts')
        .insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            message: req.body.message
        })
    if (error) {
        res.send(error);
    }
    res.render('partials/confirmation', {
        title: "Bevestiging",
        confirmation: "Je bericht is verstuurd!",
    });
});

const resendApiKey = process.env.RESEND_API_KEY

const resend = new Resend(resendApiKey);

router.get("/test", async (req, res) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <alexanderkeisha9@gmail.com>",
            to: ["alexanderkeisha9@gmail.com"],
            subject: "hello world",
            html: "<strong>it works!</strong>",
        });

        if (error) {
            return res.status(400).json({ error });
        }

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;