import type { PatientData } from '../../types';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Card, CardContent } from '../ui/Card';

interface Props {
    data: PatientData;
    onChange: (field: keyof PatientData, value: string) => void;
}

export const PhysicalExamForm = ({ data, onChange }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* General Vitals */}
            <Card className="md:col-span-2 bg-slate-50 border-slate-200">
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-3">
                        <Input label="Estado Geral" value={data.ef_geral} onChange={(e) => onChange('ef_geral', e.target.value)} />
                    </div>
                    <div><Input label="PA (mmHg)" value={data.pa} onChange={(e) => onChange('pa', e.target.value)} className="text-center" /></div>
                    <div><Input label="FC (bpm)" value={data.fc} onChange={(e) => onChange('fc', e.target.value)} className="text-center" /></div>
                    <div><Input label="SAT (%)" value={data.sat} onChange={(e) => onChange('sat', e.target.value)} className="text-center" /></div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-4">
                    <Input label="ACV" value={data.acv} onChange={(e) => onChange('acv', e.target.value)} />
                    <Input label="AR" value={data.ar} onChange={(e) => onChange('ar', e.target.value)} />
                    <Input label="Abdome" value={data.abd} onChange={(e) => onChange('abd', e.target.value)} />
                    <Input label="Dinâmica" value={data.dinamica} onChange={(e) => onChange('dinamica', e.target.value)} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="AFU (cm)" value={data.afu} onChange={(e) => onChange('afu', e.target.value)} className="text-center font-bold" />
                        <Input label="BCF (bpm)" value={data.bcf} onChange={(e) => onChange('bcf', e.target.value)} className="text-center font-bold text-blue-600 border-blue-200" />
                    </div>
                    <Input label="Mov. Fetais" value={data.mf} onChange={(e) => onChange('mf', e.target.value)} />
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-4">
                    <div>
                        <TextArea label="Especular" value={data.especular} onChange={(e) => onChange('especular', e.target.value)} className="h-24" />
                    </div>
                    <div>
                        <TextArea label="Toque Vaginal" value={data.tv} onChange={(e) => onChange('tv', e.target.value)} className="h-24" />
                    </div>
                    <Input label="MMII" value={data.mmii} onChange={(e) => onChange('mmii', e.target.value)} />
                </CardContent>
            </Card>

        </div>
    );
};
