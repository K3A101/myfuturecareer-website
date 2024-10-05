const express = require("express");
const app = express();
const router = express.Router();

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


router.get('/', (req, res) => {
    res.render('index', {
        title: "My Future Career | Adviesbureau"
    })
})

router.get('/services', async (req, res) => {
    const { data, error } = await supabase
        .from('services')
        .select()
        res.send(data);
})

module.exports = router;