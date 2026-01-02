export interface PatientData {
    // Identification
    nome: string;
    idade: string;
    prontuario: string;

    // Obstetric History
    gpa: string;
    ultimo_parto: string;
    filhos_vivos: string;
    curetagem: string;
    ig_usg: string;
    labs_triagem: string;
    pn_count: string;
    gbs: string;
    maturacao: string;

    // Gynecology History
    dum: string;
    sexarca: string;
    mac: string; // Metodo contraceptivo

    // General History
    comorbidades: string;
    muc: string;
    alergias: string;
    cirurgias: string;
    habitos: string;

    // Anamnesis
    qp: string;
    hda: string;
    hd_neg: string;

    // IS (Gyn)
    is_urinarias: string;
    is_intestinal: string;
    queixas_gyn: string;

    // Physical Exam - Vitals & General
    ef_geral: string;
    pa: string;
    fc: string;
    sat: string;
    acv: string;
    ar: string;
    abd: string;

    // Physical Exam - Obstetric
    dinamica: string;
    afu: string;
    bcf: string;
    mf: string;

    // Physical Exam - Pelvic/Extremities
    especular: string;
    tv: string;
    mmii: string;

    // Docs & Exams results (APAE = Exams card)
    apae1: string;
    apae2: string;
    usg_1t: string;
    usg_morf: string;
    exames_comp: string;

    // Final Planning
    plano_parto: string;
    gestacao_ig: string;
    staff: string;
    conduta: string;
}

export const INITIAL_PATIENT_DATA: PatientData = {
    nome: '', idade: '', prontuario: '',
    gpa: '', ultimo_parto: '', filhos_vivos: '', curetagem: '',
    ig_usg: '', labs_triagem: '', pn_count: '', gbs: '', maturacao: '',
    dum: '', sexarca: '', mac: '',
    comorbidades: 'NEGA', muc: 'NEGA', alergias: 'NEGA', cirurgias: '', habitos: 'NEGA',
    qp: '', hda: '', hd_neg: 'NEGA: SANGRAMENTOS, METROSSISTOLES, CORRIMENTO VAGINAL, PERDAS VAGINAIS, QUEIXAS URINARIAS.',
    is_urinarias: 'NEGA: DISURIA, POLACIURIA E INCONTINÊNCIA',
    is_intestinal: 'REGULAR E FISIOLÓGICO',
    queixas_gyn: 'NEGA: CORRIMENTOS, DISPAREUNIA E SINUSORRAGIA',
    ef_geral: 'BEG, AAA, CORADA E HIDRATADA',
    pa: '', fc: '', sat: '',
    acv: 'RCR, 2T, BNF, SS',
    ar: 'MV+, SRA, SEM SINAIS DE DESCONFORTO',
    abd: 'ABDOME GRAVIDICO, SEM DOR A PALPAÇÃO, RHA+, DB NEGATIVA.',
    dinamica: 'AUSENTE',
    afu: '', bcf: '', mf: 'PRESENTES',
    especular: 'COLO TRÓFICO, ORIFÍCIO EXTERNO PUNTIFORME, VAGINA COM RUGOSIDADES TRÓFICAS E ÚMIDA. CONTEUDO VAGINAL FISIOLOGICO.',
    tv: 'COLO POSTERIOR, IMPERVIO, GROSSO.',
    mmii: 'AUSÊNCIA DE EDEMA. PANTURRILHAS LIVRES E INDOLORES',
    apae1: '', apae2: '', usg_1t: '', usg_morf: '', exames_comp: '',
    plano_parto: '', gestacao_ig: '', staff: '',
    conduta: 'ORIENTO PACIENTE SOBRE O QUADRO. ORIENTO RETORNO IMEDIATO SE SINAIS DE ALARME: PICO APRESSÓRICO, REDUÇÃO DE MF, PERDA DE LIQUIDO, SANGRAMENTO VAGINAL.'
};

export type AppMode = 'OBST' | 'GYN';
