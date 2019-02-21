const settings = {
    DEFAULT_RANGE: 11,
    RANGE_OFFERED: [7, 9, 11],
    PROGRESS_FLAGS: [0, 1, 2, 3],
    CHAR_LIMIT: 350,
    NAME_LIMIT: 100,
    STATE_LIMIT: 47,
    FIELDS_LIMIT: 10,
    FIELD_NAME_LIMIT: 100,
    PAGINATE_TABLES: 10,
    PAGINATE_LISTS: 10,
    EXPIRE_TIME: 7200,

    INS_PAGE_NAMES: ['Main', 'Registration', 'Initial Sort', 'Q-Sort', 'Questionnaire', 'ToC Accept Prompt', 'ID Prompt'],
    INS_LIMIT: [20, 5, 5, 5, 5, 1, 5],
    INS_CHAR_LIMIT: 1000,

    DEFAULT_INSTRUCTIONS: [
        /* Instructions */
        [
            "Thank you for agreeing to take part in our study. For optimal performance, please maximise your browser window.",
            "Read the following instructions carefully. The program will ask you to follow these steps which will be detailed below.",
            "Step 1) Fill out the questions that you will find in the next page.",
            "Step 2) You will be given a series of statements. You will be able to read the statements one by one. Read each statement carefully, then sort it into one of three given groups that you will see on the screen, on whether you agree, you don't agree or you are neutral about it. You can always change your mind later.",
            "Step 3) You will be shown the statements again, this time divided into the groups you sorted in step 2. Now, sort the statements out on the given graph from a +5 (most agree) to a -5 (least agree) scale.",
            "Please remember that you can only sort the statements on the sorting grid by dragging and dropping each statement.",
            "You must sort all statements.",
            "Any card places in the same column has the same value, and it <i>does not matter</i> if you place it at the top of the bottom of a column.",
            "If you place a card under a negative number, it does not mean that you don't agree with it. It means that you simply agree with it less than those on the column to its right and more than those on the column to its left.",
            "Thank you so much for your help."
        ],
        [
            "Fill out the following questions concerning your personal details.",
            "Please answer truthfully and honestly, all data collected is stored securely and safely anonomised and thus cannot be used to identify you."
        ],
        [
            "You will be given a series of statement cards",
            "Read these statement cards one by one",
            "Sort the statement cards into one of three given groups that you will see on the screen by clicking and dragging with your mouse, depending on whether you agree, you don't agree or you are neutral about it.",
            "Alternatively, you may click on the agree, disagree and neutral groups with your mouse to sort cards as an alternative to clicking and dragging"
        ],
        [
            "You will be shown the statement cards again, this time divided into the groups you sorted in step 2.",
            "Click on statements from the three groups, and drag them into empty spaces on the grid with your mouse. You should sort the statements out on the given graph from a +5 (most agree) to a -5 (least agree) scale. You may swap already placed statements in the grid by clicking and dragging. You must sort all statements.",
            "Statements in the same column have the same value, and it <i>does not matter</i> if you place it at the top of the bottom of a column. A statement placed in a negative column does not imply you don't agree with it. It means that you simply agree with it less than those on the column to its right and more than those on the column to its left.",
            "Alternatively, you may click on one of the statement groups (agree, disagree, neutral) and then click an empty space on the grid to place the top most statement into that empty space. The currently selected group is indicated by the checkmark."
        ],
        [
            "You will be asked a series of questions concerning your submitted preferences and about the survey in general."
        ],
        /* Terms of Agreement/Conmfirmation Dialogue */
        [   "By clicking OK you acknowledge that you have read all relevant permission forms and agree to their terms and conditions" ],
        [
            "Please keep a record of the following information.",
            "In particular, your user ID is required if you wish to exit the survey and resume completion later or delete your data from the survey's dataset."
        ]
    ],
    /* Unless you know what you are doing, don't touch these */
    INS_INSTRUCTIONS: 0,
    INS_REGISTRATION: 1,
    INS_INIT_SORT: 2,
    INS_Q_SORT: 3,
    INS_QUESTIONNAIRE: 4,
    PROMPT_ACCEPT: 5,
    PROMPT_ID: 6,
}

module.exports = settings;
