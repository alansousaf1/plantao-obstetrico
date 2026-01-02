import { useEffect, useState } from 'react';
import type { PatientData, AppMode } from '../../types';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { FileCheck, RefreshCw, Copy, Check } from 'lucide-react';

interface Props {
    data: PatientData;
    onChange: (field: keyof PatientData, value: string) => void;
    mode: AppMode;
}

export const FinalReport = ({ data, onChange, mode }: Props) => {
    const [outputText, setOutputText] = useState('');
    const [copied, setCopied] = useState(false);

    // Helper to format values
    const v = (val: string) => val ? val.toUpperCase().trim() : 'NEGA/NÃO INF.';
    const d = new Date().toLocaleDateString('pt-BR');

    const generateOutput = () => {
        let out = "";

        if (mode === 'OBST') {
            out = `## URGÊNCIA OBSTETRÍCIA MATERNIDADE - DATA ${d} ###\n\n`;
            out += `- NOME: ${v(data.nome)}\n`;
            out += `- IDADE: ${v(data.idade)}\n`;
            out += `- PRONTUÁRIO: ${v(data.prontuario)}\n`;
            out += `- PARIDADE: ${v(data.gpa)}\n`;
            out += `   >> ÚLTIMO PARTO/ CESÁREA HÁ: ${v(data.ultimo_parto)}\n`;
            out += `   >> N° FILHOS VIVOS: ${v(data.filhos_vivos)}\n`;
            out += `   >> CURETAGEM: ${v(data.curetagem)}\n`;
            out += `- IG: ${v(data.ig_usg)}\n`;
            out += `- TS: | TOXOPLASMOSE: | GJ: | TOTG: ${v(data.labs_triagem)}\n`;
            out += `- COMORBIDADES: ${v(data.comorbidades)}\n`;
            out += `- MUC: ${v(data.muc)}\n`;
            out += `- ALERGIAS: ${v(data.alergias)}\n`;
            out += `- CIRURGIAS PRÉVIAS: ${v(data.cirurgias)}\n`;
            out += `- TABAGISMO/ ETILISMO/UDI: ${v(data.habitos)}\n`;
            out += `- QUANTIDADES DE CONSULTAS DE PRÉ-NATAL: ${v(data.pn_count)}\n`;
            out += `- GBS: ${v(data.gbs)}\n`;
            out += `- MATURAÇÃO: ${v(data.maturacao)}\n\n`;
            out += `# QP: ${v(data.qp)}\n\n`;
            out += `# HDA: ${v(data.hda)}\n\n`;
            out += `# HD: ${v(data.hd_neg)}\n\n`;
            out += `# EXAME FÍSICO:\n`;
            out += `- ${v(data.ef_geral)}\n`;
            out += `- SINAIS VITAIS: PA: ${v(data.pa)} MMHG / FC: ${v(data.fc)} BPM\n`;
            out += `- ACV: ${v(data.acv)}\n`;
            out += `- AR: ${v(data.ar)}\n`;
            out += `- ABD: ${v(data.abd)}\n`;
            out += `- DINAMICA UTERINA: ${v(data.dinamica)}\n`;
            out += `- AFU: ${v(data.afu)} CM; AL FISIOLOGICO\n`;
            out += `- BCF: ${v(data.bcf)} BPM- SEM DESACELERAÇÕES\n`;
            out += `- MOVIMENTOS FETAIS: ${v(data.mf)}\n`;
            out += `- ESPECULAR (SE REALIZADO): ${v(data.especular)}\n`;
            out += `- TV (SE REALIZADO): ${v(data.tv)}\n`;
            out += `- MMII: ${v(data.mmii)}\n\n`;
            out += `# EXAMES COMPLEMENTARES:\n>> APAE<<\n`;
            out += `- APAE I (DATA): ${v(data.apae1)}\n`;
            out += `- APAE II (DATA): ${v(data.apae2)}\n`;
            out += `>> USG<<\n`;
            out += `- USG 1T: ${v(data.usg_1t)}\n`;
            out += `- USG MORFOLOGICO: ${v(data.usg_morf)}\n`;
            out += `- ÚLTIMO USG: ${v(data.exames_comp)}\n`;
            out += `- SEMPRE RECALCULAR PESO PELO HADLOCK (SITE PERINATOLOGY)\n\n`;
            out += `# PLANO DE PARTO: ${v(data.plano_parto)}\n`;
            out += `- GESTAÇÃO TÓPICA IG: ${v(data.gestacao_ig)}\n\n`;
            out += `# CONDUTA DISCUTIDA E ORIENTADA POR STAFF DR ${v(data.staff)}\n`;
            out += `- ${v(data.conduta)}`;
        } else {
            out = `###########################################################\n`;
            out += `###### CONSULTA GINECOLÓGICA  URGÊNCIA - DATA ${d} #####\n\n`;
            out += `- NOME: ${v(data.nome)}\n`;
            out += `- PRONTUÁRIO: ${v(data.prontuario)}\n`;
            out += `- IDADE: ${v(data.idade)}\n`;
            out += `- COMORBIDADES: ${v(data.comorbidades)}\n`;
            out += `- MUC: ${v(data.muc)}\n`;
            out += `- ALERGIAS: ${v(data.alergias)}\n`;
            out += `- CIRURGIAS: ${v(data.cirurgias)}\n\n`;
            out += `# ANTECEDENTES GINECO-OBSTÉTRICOS:\n`;
            out += `- ${v(data.gpa)}\n`;
            out += `- DUM: ${v(data.dum)}\n`;
            out += `- SEXARCA: ${v(data.sexarca)}\n`;
            out += `- MÉTODO CONTRACEPTIVO: ${v(data.mac)}\n\n`;
            out += `# HDA: ${v(data.hda)}\n\n`;
            out += `# IS:\n`;
            out += `- URINÁRIAS: ${v(data.is_urinarias)}\n`;
            out += `- HABITO INTESTINAL: ${v(data.is_intestinal)}\n\n`;
            out += `# EXAME FÍSICO\n`;
            out += `- SSVV: PA ${v(data.pa)} MMHG // FC ${v(data.fc)} BPM // SAT ${v(data.sat)}% AA\n`;
            out += `- ${v(data.ef_geral)}\n`;
            out += `- ACV: ${v(data.acv)}\n`;
            out += `- AR: ${v(data.ar)}\n`;
            out += `- ABD: ${v(data.abd)}\n`;
            out += `- ESPECULAR: ${v(data.especular)}\n`;
            out += `- TV: ${v(data.tv)}\n`;
            out += `- MMII: ${v(data.mmii)}\n\n`;
            out += `# CD ORIENTADA POR STAFF DR.(A) ${v(data.staff)}:\n`;
            out += `# EXAMES COMPLEMENTARES:\n${v(data.exames_comp)}\n\n`;
            out += `- ${v(data.conduta)}\n\n`;
            out += `QUEIXAS GINECOLOGICAS: ${v(data.queixas_gyn)}`;
        }
        setOutputText(out);
    };

    useEffect(() => {
        generateOutput();
    }, [data, mode]); // Live update

    const handleCopy = () => {
        navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2"><Input label="Plano de Parto" value={data.plano_parto} onChange={(e) => onChange('plano_parto', e.target.value)} /></div>
                    <div className="md:col-span-2"><Input label="Gestação Tópica IG" value={data.gestacao_ig} onChange={(e) => onChange('gestacao_ig', e.target.value)} /></div>

                    <div><Input label="Staff Responsável" value={data.staff} onChange={(e) => onChange('staff', e.target.value)} /></div>
                    <div className="md:col-span-2"><TextArea label="Conduta" value={data.conduta} onChange={(e) => onChange('conduta', e.target.value)} className="h-24" /></div>
                </CardContent>
            </Card>

            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <FileCheck className="text-emerald-500" size={20} />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resultado Final</span>
                    </div>
                    <Button variant="ghost" className="text-slate-400 hover:text-white" onClick={generateOutput}>
                        <RefreshCw size={14} /> Atualizar
                    </Button>
                </div>

                <div className="p-0">
                    <textarea
                        value={outputText}
                        readOnly
                        className="w-full h-96 bg-slate-900 text-slate-300 font-mono text-xs p-6 outline-none resize-none leading-relaxed border-none focus:ring-0 selection:bg-blue-500/30"
                    />
                </div>

                <div className="p-4 bg-slate-950 border-t border-slate-800">
                    <Button
                        onClick={handleCopy}
                        className={`w-full py-4 uppercase text-sm font-bold shadow-lg transition-all ${copied ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-blue-600 hover:bg-blue-500'}`}
                    >
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                        {copied ? 'Copiado para Área de Transferência!' : 'Copiar para Prontuário'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
