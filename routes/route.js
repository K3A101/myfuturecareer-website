const express = require("express");
const app = express();
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

module.exports = router;