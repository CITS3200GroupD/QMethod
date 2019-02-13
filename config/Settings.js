const settings = {
    DEFAULT_RANGE: 11,
    RANGE_OFFERED: [7, 9, 11],
    PROGRESS_FLAGS: [0, 1, 2, 3],
    CHAR_LIMIT: 350,
    NAME_LIMIT: 100,
    STATE_LIMIT: 80,
    FIELDS_LIMIT: 10,
    FIELD_NAME_LIMIT: 100,
    PAGINATE_TABLES: 10,
    PAGINATE_LISTS: 5,
    EXPIRE_TIME: 7200,

    DEFAULT_INSTRUCTIONS: [
    `Thank you for agreeing to take part in our study. Please read carefully the following instructions. The program will ask you to follow these steps which will be detailed below.`,
    `Step 1) Fill out the questions that you will find in the next page.`,
    `Step 2) You will be given a series of statements. You will be able to read the statements one by one.
    Once you read a statement, sort it into one of three given groups that you will see on the screen, on whether you agree, you don't agree or you are neutral about it.
    You can always change your mind later.`,
    `Step 3) You will be shown the statements again, this time divided into the groups you sorted in step 2. Now,
    sort the statements out on the given graph from a +5 (most agree) to a -5 (least agree) scale.`,
    `Please remember that you can only sort the statements on the sorting grid by dragging and dropping each statement.`,
    `You must sort all statements.`,
    `Any card places in the same column has the same value, and it does not matter if you place it at the top of the bottom
     of a column.`,
    `If you place a card under a negative number, it <i>does not mean</i> that you don't agree with it. It means that you
    simply agree with it less than those on the column to its right and more than those on the column to its left.`,
    `Thank you so much for your help.`
    ]
}

module.exports = settings;
