import type { PatientData, AppMode } from '../../types';
import { Input } from '../ui/Input';
import { Card, CardContent } from '../ui/Card';

interface Props {
    data: PatientData;
    onChange: (field: keyof PatientData, value: string) => void;
    mode: AppMode;
}

export const IdentificationForm = ({ data, onChange, mode }: Props) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card>
                <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    <div className="md:col-span-2">
                        <Input label="Nome Completo" value={data.nome} onChange={(e) => onChange('nome', e.target.value)} placeholder="NOME DA PACIENTE" />
                    </div>
                    <div>
                        <Input label="Idade" value={data.idade} onChange={(e) => onChange('idade', e.target.value)} />
                    </div>
                    <div>
                        <Input label="Prontuário" value={data.prontuario} onChange={(e) => onChange('prontuario', e.target.value)} />
                    </div>
                </CardContent>
            </Card>

            {mode === 'OBST' ? (
                <Card className="bg-blue-50/50 border-blue-100">
                    <div className="px-6 pt-4 pb-0">
                        <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Dados Obstétricos</h3>
                    </div>
                    <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <div><Input label="G P A" value={data.gpa} onChange={(e) => onChange('gpa', e.target.value)} placeholder="G_ P_ A_" /></div>
                        <div><Input label="Último Parto" value={data.ultimo_parto} onChange={(e) => onChange('ultimo_parto', e.target.value)} /></div>
                        <div><Input label="Filhos Vivos" value={data.filhos_vivos} onChange={(e) => onChange('filhos_vivos', e.target.value)} /></div>
                        <div><Input label="Curetagem" value={data.curetagem} onChange={(e) => onChange('curetagem', e.target.value)} /></div>

                        <div className="md:col-span-2"><Input label="IG (USG Data e IG)" value={data.ig_usg} onChange={(e) => onChange('ig_usg', e.target.value)} /></div>
                        <div className="md:col-span-2"><Input label="TS | Toxo | GJ | TOTG" value={data.labs_triagem} onChange={(e) => onChange('labs_triagem', e.target.value)} /></div>

                        <div><Input label="Consultas PN" value={data.pn_count} onChange={(e) => onChange('pn_count', e.target.value)} /></div>
                        <div><Input label="GBS" value={data.gbs} onChange={(e) => onChange('gbs', e.target.value)} /></div>
                        <div className="md:col-span-2"><Input label="Maturação" value={data.maturacao} onChange={(e) => onChange('maturacao', e.target.value)} /></div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="bg-pink-50/30 border-pink-100">
                    <div className="px-6 pt-4 pb-0">
                        <h3 className="text-xs font-bold text-pink-600 uppercase tracking-wider">Antecedentes Gineco-Obstétricos</h3>
                    </div>
                    <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <div><Input label="G P A" value={data.gpa} onChange={(e) => onChange('gpa', e.target.value)} /></div>
                        <div><Input label="DUM" value={data.dum} onChange={(e) => onChange('dum', e.target.value)} /></div>
                        <div><Input label="Sexarca" value={data.sexarca} onChange={(e) => onChange('sexarca', e.target.value)} /></div>
                        <div><Input label="Método Contraceptivo" value={data.mac} onChange={(e) => onChange('mac', e.target.value)} /></div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    <div className="md:col-span-4"><Input label="Comorbidades" value={data.comorbidades} onChange={(e) => onChange('comorbidades', e.target.value)} /></div>
                    <div className="md:col-span-2"><Input label="MUC" value={data.muc} onChange={(e) => onChange('muc', e.target.value)} /></div>
                    <div className="md:col-span-2"><Input label="Alergias" value={data.alergias} onChange={(e) => onChange('alergias', e.target.value)} /></div>
                    <div className="md:col-span-2"><Input label="Cirurgias Prévias" value={data.cirurgias} onChange={(e) => onChange('cirurgias', e.target.value)} /></div>
                    <div className="md:col-span-2"><Input label="Hábitos" value={data.habitos} onChange={(e) => onChange('habitos', e.target.value)} /></div>
                </CardContent>
            </Card>
        </div>
    );
};
