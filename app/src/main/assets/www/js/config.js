function dashboard(){
    
    var html = '<div class="row">\
                    <div class="col-sm-12 col-md-6 col-lg-6">\
                        <h5 class="app_sup_title">My Practices</h5>\
                        <table class="table table-striped table-bordered text-white">\
                          <thead>\
                            <tr>\
                              <th scope="col" width="70%">Name</th>\
                              <th scope="col">Total Duration</th>\
                            </tr>\
                          </thead>\
                          <tbody>\
                            <tr>\
                              <td>1. Buddha Vandana</td>\
                              <td>00:45:30</td>\
                            </tr>\
                            <tr>\
                              <td>2. xx</td>\
                              <td></td>\
                            </tr>\
                            <tr>\
                              <td>3. xx</td>\
                              <td></td>\
                            </tr>\
                          </tbody>\
                        </table>\
                    </div>\
                    <div class="col-sm-12 col-md-6 col-lg-6">\
                        <div>\
                            <h5 class="app_sup_title list-inline-item mt-1">Buddha Vandana Details</h5>\
                            <div class="form_edit_icon list-inline-item float-right">\
                                <a><i class="fa fa-arrow-left" aria-hidden="true"></i></a>\
                                <a><i class="fa fa-pencil" aria-hidden="true"></i></a>\
                                <a><i class="fa fa-trash" aria-hidden="true"></i></a>\
                            </div>\
                        </div>\
                        <table class="table table-striped table-bordered text-white">\
                          <thead>\
                            <tr>\
                              <th scope="col" width="70%">Name</th>\
                              <th scope="col">Total Duration</th>\
                            </tr>\
                          </thead>\
                          <tbody>\
                            <tr>\
                              <td>1. xx</td>\
                              <td>00:5:00</td>\
                            </tr>\
                            <tr>\
                              <td>2. xx</td>\
                              <td></td>\
                            </tr>\
                            <tr>\
                              <td>3. xx</td>\
                              <td></td>\
                            </tr>\
                          </tbody>\
                        </table>\
                    </div>\
                </div>\
                <div class="row">\
                    <div class="col-sm-12 col-md-6 col-lg-6">\
                        <h5 class="app_sup_title"> XX Details </h5>\
                        <p>\
                            Laity: Permit me, Bhante/Ayya,* I ask for the three refuges together with the five precepts. Please, Bhante/Ayya, kindly administer the precepts to me.\
                            A second time permit me … (repeat above)\
                            A third time permit me … (repeat above)\
                        </p>\
                    </div>\
                </div>'
    
    //var db = openDatabase('mydb', '1.0', 'Bhavana_Vandana', 2 * 1024 * 1024);
    var db = window.sqlitePlugin.openDatabase({ name: 'BhaVa.db', iosDatabaseLocation:'default'});

    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS dashboard');
        tx.executeSql('CREATE TABLE IF NOT EXISTS dashboard (id integer primary key, content text)');
        tx.executeSql('INSERT INTO dashboard(content) VALUES (?)', [html], function(tx, res) {
            console.log("Pinned insertId: " + ' = ' + res.insertId + " -- probably 1");
            window.localStorage.setItem("dashboard_data", res.insertId);
            //Get insert dashboard data
            getDashboardData();
        },
        function(error) {
            alert('Error occurred');
        });
    });
}

function getDashboardData(){
    
    var db = window.sqlitePlugin.openDatabase({ name: 'BhaVa.db', iosDatabaseLocation:'default'});
    
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM dashboard', [], function (tx, results) {
            var len = results.rows.length, i;
            msg = "<p>Found rows: " + len + "</p>";
            console.log("msg=>"+JSON.stringify(msg));

            for (i = 0; i < len; i++) {
                //console.log(results.rows.item(i).content );
                var content = results.rows.item(i).content;
                $("#dashboard_html").html(content)
            }
        },
        function(e) {
            console.log("ERROR: getpinned_stored_offlinedata: " + e.message);
        });
    });
}

function insert_singlePageView(){
    
    var html = '<div class="slider">\
                    <div class="row slide">\
                        <div class="col-md-12">\
                            <div class="text-white">\
                                <h5 class="app_sup_title"> Three Refuges and Five Precepts </h5>\
                                <p class="mb-2">\
                                    <a onclick="playAudio(\'audio1\')">\
                                        Play audio <i class="fa fa-play-circle ml-1"></i>\
                                    </a>\
                                </p>\
                                <p id="audio1" class="collapse">\
                                    <audio class="align-middle" controls>\
                                        <source src="audio/Segment1.mp3" type="audio/mpeg">\
                                        Your browser does not support the audio element.\
                                    </audio>\
                                </p>\
                                <p>\
                                    Namo tassa Bhagavato arahato sammā‧sambuddhassa.<br>\
                                    Namo tassa Bhagavato arahato sammā‧sambuddhassa.<br>\
                                    Namo tassa Bhagavato arahato sammā‧sambuddhassa.\
                                </p>\
                                <p>\
                                    Buddhaṃ saraṇaṃ gacchāmi.<br>\
                                    Dhammaṃ saraṇaṃ gacchāmi.<br>\
                                    Saṅghaṃ saraṇaṃ gacchāmi.\
                                </p>\
                                <p>\
                                    Dutiyam pi Buddhaṃ saraṇaṃ gacchāmi.<br>\
                                    Dutiyam pi Dhammaṃ saraṇaṃ gacchāmi.<br>\
                                    Dutiyam pi Saṅghaṃ saraṇaṃ gacchāmi.\
                                </p>\
                                <p>\
                                    Tatiyam pi Buddhaṃ saraṇaṃ gacchāmi.<br>\
                                    Tatiyam pi Dhammaṃ saraṇaṃ gacchāmi.<br>\
                                    Tatiyam pi Saṅghaṃ saraṇaṃ gacchāmi.\
                                </p>\
                                <p> Pāṇātipātā veramaṇī‧sikkhāpadaṃ samādiyāmi. </p>\
                                <p> Adinnādānā veramaṇī‧sikkhāpadaṃ samādiyāmi. </p>\
                                <p> Kāmesu micchācārā veramaṇī‧sikkhāpadaṃ samādiyāmi. </p>\
                                <p> Musā‧vādā veramaṇī‧sikkhāpadaṃ samādiyāmi. </p>\
                                <p> Surā‧meraya‧majja‧pamādaṭṭhānā veramaṇī‧sikkhāpadaṃ samādiyāmi. </p>\
                                <p> Tisaraṇena saddhiṃ pañca‧sīlaṃ dhammaṃ samādayitvā sādhukaṃ surakkhitaṃ katvā appamādena sampādetabbaṃ. </p>\
                                <p>\
                                    Sīlena sugatiṃ yanti,<br>\
                                    Sīlena bhoga‧sampadā,<br>\
                                    Sīlena nibbutiṃ yanti,<br>\
                                    Tasmā sīlaṃ visodhaye.\
                                </p>\
                                <p> Sādhu! Sādhu! Sādhu! </p>\
                            </div>\
                        </div>\
                        <div class="col-md-12">\
                            <div class="text-white border-top-dashed pt-3">\
                                <h5 class="app_sup_title"> Three Refuges and Five Precepts </h5>\
                                <p>\
                                    I go to the Buddha for refuge.<br>\
                                    I go to the Dhamma for refuge.<br>\
                                    I go to the Sangha for refuge.\
                                </p>\
                                <p>\
                                    A second time I go to the Buddha for refuge.<br>\
                                    A second time I go to the Dhamma for refuge.<br>\
                                    A second time I go to the Sangha for refuge.\
                                </p>\
                                <p>\
                                    A third time I go to the Buddha for refuge.<br>\
                                    A third time I go to the Dhamma for refuge.<br>\
                                    A third time I go to the Sangha for refuge.\
                                </p>\
                                <p> I undertake the training rule to abstain from taking life. </p>\
                                <p> I undertake the training rule to abstain from taking what is not given. </p>\
                                <p> I undertake the training rule to abstain from sensual misconduct. </p>\
                                <p> I undertake the training rule to abstain from false speech. </p>\
                                <p> I undertake the training rule to abstain from intoxicating drinks and drugs causing heedlessness. </p>\
                                <p> Having well undertaken and kept the five precepts, together with the three refuges, one should strive on with diligence. </p>\
                                <p> With morality, good rebirth is gained; </p>\
                                <p> With morality, wealth is achieved; </p>\
                                <p> With morality, perfect peace is attained. </p>\
                                <p> Therefore, morality should be purified. </p>\
                                <p> Excellent! Excellent! Excellent! </p>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="row slide">\
                        <div class="col-md-12">\
                            <div class="text-white">\
                                <h5 class="app_sup_title"> Karaṇīyametta Sutta </h5>\
                                <p class="mb-2">\
                                    <a onclick="playAudio(\'audio2\')">\
                                        Play audio <i class="fa fa-play-circle ml-1"></i>\
                                    </a>\
                                </p>\
                                <p id="audio2" class="collapse">\
                                    <audio class="align-middle" controls>\
                                        <source src="audio/Segment2.mp3" type="audio/mpeg">\
                                        Your browser does not support the audio element.\
                                    </audio>\
                                </p>\
                                <p>\
                                    Namo tassa Bhagavato arahato sammā‧sambuddhassa. <br>\
                                    Namo tassa Bhagavato arahato sammā‧sambuddhassa. <br>\
                                    Namo tassa Bhagavato arahato sammā‧sambuddhassa.\
                                </p>\
                                <p>\
                                    Karaṇīyam atthakusulena <br>\
                                    Yaṃ taṃ santaṃ padaṃ abhisamecca <br>\
                                    Sakko ujū ca sūjū ca <br>\
                                    Suvaco c’assa mudu anatimānī.\
                                </p>\
                                <p>\
                                    Santussako ca subharo ca <br>\
                                    Appakicco ca sallahukavutti <br>\
                                    Santindriyo ca nipako ca <br>\
                                    Appagabbho kulesu ananugiddho.\
                                </p>\
                                <p>\
                                    Na ca khuddaṃ samācare kiñci <br>\
                                    Yena viññū pare upavadeyyuṃ <br>\
                                    Sukhino vā khemino hontu <br>\
                                    Sabbe sattā bhavantu sukhitattā.\
                                </p>\
                                <p>\
                                    Ye keci pāṇabhūt’atthi <br>\
                                    Tasā vā thāvarā vā anavasesā <br>\
                                    Dīghā vā ye mahantā vā <br>\
                                    Majjhimā rassakā aṇuka‧thūlā.\
                                </p>\
                                <p>\
                                    Diṭṭhā vā yeva addiṭṭhā <br>\
                                    Ye ca dūre vasanti avidūre <br>\
                                    Bhūtā vā sambhavesī vā <br>\
                                    Sabbe sattā bhavantu sukhitattā.\
                                </p>\
                                <p>\
                                    Na paro paraṃ nikubbetha <br>\
                                    N’ātimaññetha katthacinaṃ kañci <br>\
                                    Byārosanā paṭighasaññā <br>\
                                    Nāññam‧aññassa dukkham iccheyya.\
                                </p>\
                                <p>\
                                    Mātā yathā niyaṃ puttaṃ <br>\
                                    Āyusā ekaputtam anurakkhe <br>\
                                    Evam pi sabba‧bhūtesu <br>\
                                    Mānasaṃ bhāvaye aparimāṇaṃ.\
                                </p>\
                                <p>\
                                    Mettañ ca sabbalokasmiṃ <br>\
                                    Mānasaṃ bhāvaye aparimāṇaṃ <br>\
                                    Uddhaṃ adho ca tiriyañ ca <br>\
                                    Asambādhaṃ averaṃ asapattaṃ.\
                                </p>\
                                <p>\
                                    Tiṭṭhaṃ caraṃ nisinno vā <br>\
                                    Sayāno vā yāvat’assa vigatamiddho <br>\
                                    Etaṃ satiṃ adhiṭṭheyya <br>\
                                    Brahmam etaṃ vihāram idhamāhu.\
                                </p>\
                                <p>\
                                    Diṭṭhiñ ca anupagamma sīlavā <br>\
                                    Dassanena sampanno <br>\
                                    Kāmesu vineyya gedhaṃ <br>\
                                    Na hi jātu gabbhaseyyaṃ punar etī’ti.\
                                </p>\
                                <p>\
                                    Etena sacca‧vajjena <br>\
                                    Sotthi me hotu sabbadā\
                                </p>\
                                <p>\
                                    Etena sacca‧vajjena <br>\
                                    Sotthi me hotu sabbadā\
                                </p>\
                                <p>\
                                    Etena sacca‧vajjena\
                                    Sotthi me hotu sabbadā\
                                </p>\
                            </div>\
                        </div>\
                        <div class="col-md-12">\
                            <div class="text-white border-top-dashed pt-3">\
                                <h5 class="app_sup_title"> Discourse on Loving-Friendliness </h5>\
                                <p>\
                                    I go to the Buddha for refuge. <br>\
                                    I go to the Dhamma for refuge. <br>\
                                    I go to the Sangha for refuge.\
                                </p>\
                                <p>\
                                    One skilled in good, wishing to attain <br>\
                                    That state of peace, should act thus: <br>\
                                    One should be able, straight, upright, <br>\
                                    Obedient, gentle, and humble.\
                                </p>\
                                <p>\
                                    One should be content, easy to support, <br>\
                                    With few duties, living lightly, <br>\
                                    Controlled in senses, discreet, <br>\
                                    Not impudent, unattached to families.\
                                </p>\
                                <p>\
                                    One should not do any slight wrong <br>\
                                    Which the wise might censure. <br>\
                                    May all beings be happy and secure. <br>\
                                    May all beings have happy minds.\
                                </p>\
                                <p>\
                                    Whatever living beings there may be, <br>\
                                    Without exception: weak or strong, <br>\
                                    Long or large, <br>\
                                    Medium, short, subtle or gross,\
                                </p>\
                                <p>\
                                    Visible or invisible, <br>\
                                    Living near or far, <br>\
                                    Born or coming to birth— <br>\
                                    May all beings have happy minds.\
                                </p>\
                                <p>\
                                    Let no one deceive another, <br>\
                                    Nor despise anyone anywhere. <br>\
                                    Neither from anger nor ill will <br>\
                                    Should anyone wish harm to another.\
                                </p>\
                                <p>\
                                    Whether standing, walking, or sitting, <br>\
                                    Lying down or whenever awake, <br>\
                                    One should develop this mindfulness. <br>\
                                    This is called divinely dwelling here.\
                                </p>\
                                <p>\
                                    Not falling into erroneous views, <br>\
                                    But virtuous and endowed with vision, <br>\
                                    Removing desire for sensual pleasures, <br>\
                                    One comes never again to birth in the womb.\
                                </p>\
                            </div>\
                        </div>\
                    </div>\
                </div>'
    
    //var db = openDatabase('mydb', '1.0', 'Bhavana_Vandana', 2 * 1024 * 1024);
    var db = window.sqlitePlugin.openDatabase({ name: 'BhaVa.db', iosDatabaseLocation:'default'});

    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS singlePageview');
        tx.executeSql('CREATE TABLE IF NOT EXISTS singlePageview (id integer primary key, content text)');
        tx.executeSql('INSERT INTO singlePageview(content) VALUES (?)', [html], function(tx, res) {
            console.log("Pinned insertId: " + ' = ' + res.insertId + " -- probably 1");
            window.localStorage.setItem("singlePageview", res.insertId);
            //Get insert dashboard data
            get_singlePageView();
        },
        function(error) {
            alert('Error occurred');
        });
    });
}

function get_singlePageView(){
    
    var db = window.sqlitePlugin.openDatabase({ name: 'BhaVa.db', iosDatabaseLocation:'default'});
    
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM singlePageview', [], function (tx, results) {
            var len = results.rows.length, i;
            msg = "<p>Found rows: " + len + "</p>";
            console.log("msg=>"+JSON.stringify(msg));

            for (i = 0; i < len; i++) {
                //console.log(results.rows.item(i).content );
                var content = results.rows.item(i).content;
                $("#singlePageview_html").html(content)
                      
                var windowHeight = window.innerHeight;
                var innerWidth   = $(".container-fluid").innerWidth() - 30;

                $(".slider").css({"width": innerWidth+"px", "height": windowHeight+"px"});
                $(".slide").css({"width": innerWidth+"px"});
            }
        },
        function(e) {
            console.log("ERROR: getpinned_stored_offlinedata: " + e.message);
        });
    });
}

function insert_tableOfContent(){
    
    var html = '<div class="row">\
                    <div class="col-sm-12 col-md-4 col-lg-4 mb-3 align-self-end">\
                        <div class="input-group custom_search">\
                          <input type="text" class="form-control" placeholder="Click to Search">\
                          <div class="input-group-append">\
                            <button class="btn btn-secondary" type="button">\
                              <i class="fa fa-search"></i>\
                            </button>\
                          </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="row">\
                    <div class="col-sm-12 table_ofContent">\
                        <div class="card">\
                            <div class="card-body p-3">\
                                <table class="table table-bordered">\
                                    <thead>\
                                        <tr>\
                                            <td> TOC No.</td>\
                                            <td> Description </td>\
                                            <td> Page No. </td>\
                                        </tr>\
                                    </thead>\
                                    <tbody>\
                                        <tr>\
                                            <td> 1 </td>\
                                            <td> <a onclick="showContentView(\'page1\')">Request for the Three Refuges and Five Precepts </a></td>\
                                            <td> 2 </td>\
                                        </tr>\
                                        <tr>\
                                            <td> 2 </td>\
                                            <td> <a onclick="showContentView(\'page2\')">Karaṇīyametta Sutta </a></td>\
                                            <td> 46 </td>\
                                        </tr>\
                                    </tbody>\
                                </table>\
                            </div>\
                        </div>\
                    </div>\
                </div>'
    
    //var db = openDatabase('mydb', '1.0', 'Bhavana_Vandana', 2 * 1024 * 1024);
    var db = window.sqlitePlugin.openDatabase({ name: 'BhaVa.db', iosDatabaseLocation:'default'});

    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS tableOfContent');
        tx.executeSql('CREATE TABLE IF NOT EXISTS tableOfContent (id integer primary key, content text)');
        tx.executeSql('INSERT INTO tableOfContent(content) VALUES (?)', [html], function(tx, res) {
            console.log("Pinned insertId: " + ' = ' + res.insertId + " -- probably 1");
            window.localStorage.setItem("tableOfContent", res.insertId);
            //Get insert dashboard data
            get_tableOfContent();
        },
        function(error) {
            alert('Error occurred');
        });
    });
}

function get_tableOfContent(){
    
    var db = window.sqlitePlugin.openDatabase({ name: 'BhaVa.db', iosDatabaseLocation:'default'});
    
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM tableOfContent', [], function (tx, results) {
            var len = results.rows.length, i;
            msg = "<p>Found rows: " + len + "</p>";
            //console.log("msg=>"+JSON.stringify(msg));

            for (i = 0; i < len; i++) {
                //console.log(results.rows.item(i).content );
                var content = results.rows.item(i).content;
                $("#tableOfContent_html").html(content)
            }
        },
        function(e) {
            console.log("ERROR: getpinned_stored_offlinedata: " + e.message);
        });
    });
}

function insert_twoPageView(){
    
    var html = '<div class="slider" id="slider_container">\
                    <div class="row mb-3 slide">\
                        <div class="col border-right">\
                            <div class="text-white">\
                                <h5 class="app_sup_title"> Three Refuges and Five Precepts </h5>\
                                <p class="mb-2">\
                                    <a onclick="playAudio(\'audio1\')">\
                                        Play audio <i class="fa fa-play-circle ml-1"></i>\
                                    </a>\
                                </p>\
                                <p id="audio1" class="collapse">\
                                    <audio class="align-middle" controls>\
                                        <source src="audio/Segment1.mp3" type="audio/mpeg">\
                                        Your browser does not support the audio element.\
                                    </audio>\
                                </p>\
                                <p>\
                                    Namo tassa Bhagavato arahato sammā‧sambuddhassa.<br>\
                                    Namo tassa Bhagavato arahato sammā‧sambuddhassa.<br>\
                                    Namo tassa Bhagavato arahato sammā‧sambuddhassa.\
                                </p>\
                                <p>\
                                    Buddhaṃ saraṇaṃ gacchāmi.<br>\
                                    Dhammaṃ saraṇaṃ gacchāmi.<br>\
                                    Saṅghaṃ saraṇaṃ gacchāmi.\
                                </p>\
                                <p>\
                                    Dutiyam pi Buddhaṃ saraṇaṃ gacchāmi.<br>\
                                    Dutiyam pi Dhammaṃ saraṇaṃ gacchāmi.<br>\
                                    Dutiyam pi Saṅghaṃ saraṇaṃ gacchāmi.\
                                </p>\
                                <p>\
                                    Tatiyam pi Buddhaṃ saraṇaṃ gacchāmi.\ <br>\
                                    Tatiyam pi Dhammaṃ saraṇaṃ gacchāmi.\ <br>\
                                    Tatiyam pi Saṅghaṃ saraṇaṃ gacchāmi.\
                                </p>\
                                <p>\
                                    Pāṇātipātā veramaṇī‧sikkhāpadaṃ samādiyāmi.<br>\
                                    Adinnādānā veramaṇī‧sikkhāpadaṃ samādiyāmi.<br>\
                                    Kāmesu micchācārā veramaṇī‧sikkhāpadaṃ samādiyāmi.<br>\
                                    Musā‧vādā veramaṇī‧sikkhāpadaṃ samādiyāmi.<br>\
                                    Surā‧meraya‧majja‧pamādaṭṭhānā veramaṇī‧sikkhāpadaṃ samādiyāmi.<br>\
                                    Tisaraṇena saddhiṃ pañca‧sīlaṃ dhammaṃ samādayitvā sādhukaṃ surakkhitaṃ katvā appamādena sampādetabbaṃ.\
                                </p>\
                                <p>\
                                    Sīlena sugatiṃ yanti,\
                                    Sīlena bhoga‧sampadā,\
                                    Sīlena nibbutiṃ yanti,\
                                    Tasmā sīlaṃ visodhaye.\
                                </p>\
                            </div>\
                        </div>\
                        <div class="col">\
                            <div class="text-white">\
                                <h5 class="app_sup_title"> Three Refuges and Five Precepts </h5>\
                                <p>\
                                    I go to the Buddha for refuge.<br>\
                                    I go to the Dhamma for refuge.<br>\
                                    I go to the Sangha for refuge.<br>\
                                    <br>\
                                    A second time I go to the Buddha for refuge.<br>\
                                    A second time I go to the Dhamma for refuge.<br>\
                                    A second time I go to the Sangha for refuge.<br>\
                                    <br>\
                                    A third time I go to the Buddha for refuge.<br>\
                                    A third time I go to the Dhamma for refuge.<br>\
                                    A third time I go to the Sangha for refuge.<br>\
                                    <br>\
                                    I undertake the training rule to abstain from taking life.<br>\
                                    I undertake the training rule to abstain from taking what is not given.<br>\
                                    I undertake the training rule to abstain from sensual misconduct.<br>\
                                    I undertake the training rule to abstain from false speech.<br>\
                                    I undertake the training rule to abstain from intoxicating drinks and drugs causing heedlessness. <br>\
                                    Having well undertaken and kept the five precepts, together with the three refuges, one should strive on with diligence. <br>\
                                    With morality, good rebirth is gained; <br>\
                                    With morality, wealth is achieved; <br>\
                                    With morality, perfect peace is attained. <br>\
                                    Therefore, morality should be purified. <br>\
                                    Excellent! Excellent! Excellent!\
                                </p>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="row mb-3 slide">\
                        <div class="col border-right">\
                            <div class="text-white">\
                                <h5 class="app_sup_title"> Karaṇīyametta Sutta </h5>\
                                <p class="mb-2">\
                                    <a onclick="playAudio(\'audio2\')">\
                                        Play audio <i class="fa fa-play-circle ml-1"></i>\
                                    </a>\
                                </p>\
                                <p id="audio2" class="collapse">\
                                    <audio class="align-middle" controls>\
                                        <source src="audio/Segment2.mp3" type="audio/mpeg">\
                                        Your browser does not support the audio element.\
                                    </audio>\
                                </p>\
                                <p>\
                                    Namo tassa Bhagavato arahato sammā‧sambuddhassa. <br>\
                                    Namo tassa Bhagavato arahato sammā‧sambuddhassa. <br>\
                                    Namo tassa Bhagavato arahato sammā‧sambuddhassa.\
                                </p>\
                                <p>\
                                    Karaṇīyam atthakusulena <br>\
                                    Yaṃ taṃ santaṃ padaṃ abhisamecca <br>\
                                    Sakko ujū ca sūjū ca <br>\
                                    Suvaco c’assa mudu anatimānī.\
                                </p>\
                                <p>\
                                    Santussako ca subharo ca <br>\
                                    Appakicco ca sallahukavutti <br>\
                                    Santindriyo ca nipako ca <br>\
                                    Appagabbho kulesu ananugiddho.\
                                </p>\
                                <p>\
                                    Na ca khuddaṃ samācare kiñci <br>\
                                    Yena viññū pare upavadeyyuṃ <br>\
                                    Sukhino vā khemino hontu <br>\
                                    Sabbe sattā bhavantu sukhitattā.\
                                </p>\
                                <p>\
                                    Ye keci pāṇabhūt’atthi <br>\
                                    Tasā vā thāvarā vā anavasesā <br>\
                                    Dīghā vā ye mahantā vā <br>\
                                    Majjhimā rassakā aṇuka‧thūlā.\
                                </p>\
                                <p>\
                                    Diṭṭhā vā yeva addiṭṭhā <br>\
                                    Ye ca dūre vasanti avidūre <br>\
                                    Bhūtā vā sambhavesī vā <br>\
                                    Sabbe sattā bhavantu sukhitattā.\
                                </p>\
                                <p>\
                                    Na paro paraṃ nikubbetha <br>\
                                    N’ātimaññetha katthacinaṃ kañci <br>\
                                    Byārosanā paṭighasaññā <br>\
                                    Nāññam‧aññassa dukkham iccheyya.\
                                </p>\
                                <p>\
                                    Mātā yathā niyaṃ puttaṃ <br>\
                                    Āyusā ekaputtam anurakkhe <br>\
                                    Evam pi sabba‧bhūtesu <br>\
                                    Mānasaṃ bhāvaye aparimāṇaṃ.\
                                </p>\
                                <p>\
                                    Mettañ ca sabbalokasmiṃ <br>\
                                    Mānasaṃ bhāvaye aparimāṇaṃ <br>\
                                    Uddhaṃ adho ca tiriyañ ca <br>\
                                    Asambādhaṃ averaṃ asapattaṃ.\
                                </p>\
                                <p>\
                                    Tiṭṭhaṃ caraṃ nisinno vā <br>\
                                    Sayāno vā yāvat’assa vigatamiddho <br>\
                                    Etaṃ satiṃ adhiṭṭheyya <br>\
                                    Brahmam etaṃ vihāram idhamāhu.\
                                </p>\
                                <p>\
                                    Diṭṭhiñ ca anupagamma sīlavā <br>\
                                    Dassanena sampanno <br>\
                                    Kāmesu vineyya gedhaṃ <br>\
                                    Na hi jātu gabbhaseyyaṃ punar etī’ti.\
                                </p>\
                                <p>\
                                    Etena sacca‧vajjena <br>\
                                    Sotthi me hotu sabbadā\
                                </p>\
                                <p>\
                                    Etena sacca‧vajjena <br>\
                                    Sotthi me hotu sabbadā\
                                </p>\
                                <p>\
                                    Etena sacca‧vajjena\
                                    Sotthi me hotu sabbadā\
                                </p>\
                            </div>\
                        </div>\
                        <div class="col">\
                            <div class="text-white">\
                                <h5 class="app_sup_title"> Discourse on Loving-Friendliness </h5>\
                                <p>\
                                    I go to the Buddha for refuge. <br>\
                                    I go to the Dhamma for refuge. <br>\
                                    I go to the Sangha for refuge.\
                                </p>\
                                <p>\
                                    One skilled in good, wishing to attain <br>\
                                    That state of peace, should act thus: <br>\
                                    One should be able, straight, upright, <br>\
                                    Obedient, gentle, and humble.\
                                </p>\
                                <p>\
                                    One should be content, easy to support, <br>\
                                    With few duties, living lightly, <br>\
                                    Controlled in senses, discreet, <br>\
                                    Not impudent, unattached to families.\
                                </p>\
                                <p>\
                                    One should not do any slight wrong <br>\
                                    Which the wise might censure. <br>\
                                    May all beings be happy and secure. <br>\
                                    May all beings have happy minds.\
                                </p>\
                                <p>\
                                    Whatever living beings there may be, <br>\
                                    Without exception: weak or strong, <br>\
                                    Long or large, <br>\
                                    Medium, short, subtle or gross,\
                                </p>\
                                <p>\
                                    Visible or invisible, <br>\
                                    Living near or far, <br>\
                                    Born or coming to birth— <br>\
                                    May all beings have happy minds.\
                                </p>\
                                <p>\
                                    Let no one deceive another, <br>\
                                    Nor despise anyone anywhere. <br>\
                                    Neither from anger nor ill will <br>\
                                    Should anyone wish harm to another.\
                                </p>\
                                <p>\
                                    Whether standing, walking, or sitting, <br>\
                                    Lying down or whenever awake, <br>\
                                    One should develop this mindfulness. <br>\
                                    This is called divinely dwelling here.\
                                </p>\
                                <p>\
                                    Not falling into erroneous views, <br>\
                                    But virtuous and endowed with vision, <br>\
                                    Removing desire for sensual pleasures, <br>\
                                    One comes never again to birth in the womb.\
                                </p>\
                            </div>\
                        </div>\
                    </div>\
                </div>'
    
    //var db = openDatabase('mydb', '1.0', 'Bhavana_Vandana', 2 * 1024 * 1024);
    var db = window.sqlitePlugin.openDatabase({ name: 'BhaVa.db', iosDatabaseLocation:'default'});

    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS twoPageview');
        tx.executeSql('CREATE TABLE IF NOT EXISTS twoPageview (id integer primary key, content text)');
        tx.executeSql('INSERT INTO twoPageview(content) VALUES (?)', [html], function(tx, res) {
            console.log("Pinned insertId: " + ' = ' + res.insertId + " -- probably 1");
            window.localStorage.setItem("twoPageview", res.insertId);
            //Get insert dashboard data
            get_twoPageView();
        },
        function(error) {
            alert('Error occurred');
        });
    });
}

function get_twoPageView(){
    
    var db = window.sqlitePlugin.openDatabase({ name: 'BhaVa.db', iosDatabaseLocation:'default'});
    
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM twoPageview', [], function (tx, results) {
            var len = results.rows.length, i;
            msg = "<p>Found rows: " + len + "</p>";
            console.log("msg=>"+JSON.stringify(msg));

            for (i = 0; i < len; i++) {
                //console.log(results.rows.item(i).content );
                var content = results.rows.item(i).content;
                $("#twoPageview_html").html(content)
                      
                var windowHeight = window.innerHeight;
                var innerWidth   = $(".container-fluid").innerWidth() - 30;

                $(".slider").css({"width": innerWidth+"px", "height": windowHeight+"px"});
                $(".slide").css({"width": innerWidth+"px"});
            }
        },
        function(e) {
            console.log("ERROR: getpinned_stored_offlinedata: " + e.message);
        });
    });
}
