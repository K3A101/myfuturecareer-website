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


module.exports = router;