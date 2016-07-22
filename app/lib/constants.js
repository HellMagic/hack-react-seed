//================= Global ===========================
export const INIT_USER_ME = 'INIT_USER_ME';
export const INIT_USER_ME_SUCCESS = 'INIT_USER_ME_SUCCESS';
export const INIT_USER_ME_FAILURE = 'INIT_USER_ME_FAILURE';
export const ALTER_COMMENT_DIALOG_STATUS = 'ALTER_COMMENT_DIALOG_STATUS';
export const SHOW_DIALOG = 'SHOW_DIALOG';
export const HIDE_DIALOG = 'HIDE_DIALOG';

export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

//================= Home =============================
export const INIT_HOME = 'INIT_HOME';
export const INIT_HOME_SUCCESS = 'INIT_HOME_SUCCESS';
export const FETCH_HOME_RAW_DATA_SUCCESS = 'FETCH_HOME_RAW_DATA_SUCCESS';

//注意：这两个变量值是一一对应的，如果修改其中一个，那么另一个也要修改。
export const FROM_YUJUAN_TEXT = '阅卷';
export const FROM_CUSTOM_TEXT = '自定义';
export const FROM_FLAG = {
    '1': FROM_YUJUAN_TEXT,
    '40': FROM_CUSTOM_TEXT
};

export const  PAPER_ORIGIN = {
    system: 'system',
    upload: 'upload'
}
//================= Dashboard ==========================

export const INIT_DASHBOARD = 'INIT_DASHBOARD';
export const INIT_DASHBOARD_SUCCESS = 'INIT_DASHBOARD_SUCCESS';
export const INIT_DASHBOARD_FAILURE = 'INIT_DASHBOARD_FAILURE';

// export const INIT_GLOBAL_GUIDE = 'INIT_GLOBAL_GUIDE';
// export const INIT_GLOBAL_GUIDE_SUCCESS = 'INIT_GLOBAL_GUIDE_SUCCESS';

// export const INIT_SCORE_RANK = 'INIT_SCORE_RANK';
// export const INIT_SCORE_RANK_SUCCESS = 'INIT_SCORE_RANK_SUCCESS';

// export const INIT_CLASS_REPORT = 'INIT_CLASS_REPORT';
// export const INIT_CLASS_REPORT_SUCCESS = 'INIT_CLASS_REPORT_SUCCESS';


// export const INIT_LEVEL_REPORT = 'INIT_LEVEL_REPORT';
// export const INIT_LEVEL_REPORT_SUCCESS = 'INIT_LEVEL_REPORT_SUCCESS';

// export const INIT_SUBJECT_REPORT = 'INIT_SUBJECT_REPORT';
// export const INIT_SUBJECT_REPORT_SUCCESS = 'INIT_SUBJECT_REPORT_SUCCESS';

// export const SOME_EXAM_TOTAL_ONE = 'SOME_EXAM_TOTAL_ONE';
// export const SOME_EXAM_TOTAL_TWO = 'SOME_EXAM_TOTAL_TWO';
// export const SOME_EXAM_TOTAL_THREE = 'SOME_EXAM_TOTAL_THREE';

// export const SOME_EXAM_ANALYSIS_ONE = 'SOME_EXAM_ANALYSIS_ONE';
// export const SOME_EXAM_ANALYSIS_TWO = 'SOME_EXAM_ANALYSIS_TWO';
// export const SOME_EXAM_ANALYSIS_THREE = 'SOME_EXAM_ANALYSIS_THREE';


//=============== SchoolAnalysis =============================
export const FETCH_SCHOOL_ANALYSIS_DATA = 'FETCH_SCHOOL_ANALYSIS_DATA';
export const FETCH_SCHOOL_ANALYSIS_DATA_SUCCESS = 'FETCH_SCHOOL_ANALYSIS_DATA_SUCCESS';
export const FETCH_SCHOOL_ANALYSIS_DATA_FAILURE = 'FETCH_SCHOOL_ANALYSIS_DATA_FAILURE';

export const CHANGE_LEVEL = 'CHANGE_LEVEL';
export const CHANGE_LEVEL_BUFFERS = 'CHANGE_LEVEL_BUFFERS';

export const SUBJECTS_WEIGHT = ['语文', '数学', '英语', '理综', '文综', '物理', '化学', '生物', '政治', '历史', '地理'];
export const NUMBER_MAP = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十'
};

export const LETTER_MAP = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G'
};

//=============== CustomAnalysis =============================
export const ADD_PAPER_INFO = 'ADD_PAPER_INFO';
export const ADD_PAPER_INFO_SUCCESS = 'ADD_PAPER_INFO_SUCCESS';

export const SUBTRACT_PAPER_INFO = 'SUBTRACT_PAPER_INFO';

export const CHECK_ALL_QUESTION = 'CHECK_ALL_QUESTION';
export const CHECK_ONE_QUESTION = 'CHECK_ONE_QUESTION';

export const SET_PAPER_SQM = 'SET_PAPER_SQM';
export const SET_MERGED_SQM = 'SET_MERGED_SQM';
export const CHANGE_QUESTION_NAME = 'CHANGE_QUESTION_NAME';
export const SET_GROUP_MAP = 'SET_GROUP_MAP';

export const SET_PAGE_INDEX = 'SET_PAGE_INDEX';
export const NEXT_PAGE = 'NEXT_PAGE';
export const PREV_PAGE = 'PREV_PAGE';

export const SAVE_CURRENT_SUBJECT = 'SAVE_CURRENT_SUBJECT';
export const SET_ANALYSIS_NAME = 'SET_ANALYSIS_NAME';
export const SET_CREATE_STATUS = 'SET_CREATE_STATUS';
export const EDIT_SUBJECT = 'EDIT_SUBJECT';
export const DELE_SUBJECT = 'DELE_SUBJECT';
export const CHANGE_CURRENT_SUBJECT_NAME = 'CHANGE_CURRENT_SUBJECT_NAME';
export const DISCARD_CURRENT_SUBJECT = 'DISCARD_CURRENT_SUBJECT';
export const UPDATE_SUBJECT_SQM = 'UPDATE_SUBJECT_SQM';
export const SET_CURSUBJECT_SQM = 'SET_CURSUBJECT_SQM';

//===================== RankReport ===========================
export const INIT_RANKREPORT = 'INIT_RANKREPORT';
export const INIT_RANKREPORT_SUCCESS = 'INIT_RANKREPORT_SUCCESS';

//====================== color ==============================
export const A11 = '#de5d44';
export const B03 = '#59bde5';