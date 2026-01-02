import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import type { PatientData } from '../../types';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Card, CardContent } from '../ui/Card';
import { extractDataFromFile } from '../../services/ai';
import { ScanLine, Loader2 } from 'lucide-react';

interface Props {
    data: PatientData;
    onChange: (field: keyof PatientData, value: string) => void;
    onUpdateAll: (data: Partial<PatientData>) => void;
}

export const DocsForm = ({ data, onChange, onUpdateAll }: Props) => {
    const [processing, setProcessing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setProcessing(true);

        // Read file as base64
        const reader = new FileReader();
        reader.onload = async (ev) => {
            try {
                const base64 = (ev.target?.result as string).split(',')[1];
                if (!base64) throw new Error("Failed to read file");

                const extractedData = await extractDataFromFile(base64, file.type);
                console.log("Extracted:", extractedData);

                // Clean up nulls
                const safeData: any = {};
                Object.keys(extractedData).forEach(key => {
                    if (extractedData[key]) safeData[key] = String(extractedData[key]);
                });

                onUpdateAll(safeData);
                alert("Dados extraídos com sucesso!");
            } catch (err) {
                console.error(err);
                alert("Erro ao processar arquivo. Verifique se é legível.");
            } finally {
                setProcessing(false);
                if (inputRef.current) inputRef.current.value = '';
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Upload Zone */}
            <div
                className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer group relative overflow-hidden ${processing ? 'border-blue-400 bg-blue-50' : 'border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 hover:border-blue-300'}`}
            >
                <input
                    type="file"
                    ref={inputRef}
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                    disabled={processing}
                />

                <div className="relative z-10 flex flex-col items-center justify-center">
                    {processing ? (
                        <>
                            <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
                            <h3 className="text-sm font-bold text-blue-800 uppercase animate-pulse">Lendo Documento...</h3>
                            <p className="text-xs text-blue-500 mt-2">A IA está analisando os dados clínicos</p>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                                <ScanLine size={32} className="text-blue-500" />
                            </div>
                            <h3 className="text-sm font-bold text-blue-800 uppercase">Leitura Mágica de Documentos</h3>
                            <p className="text-xs text-blue-500 mt-2 max-w-xs mx-auto">
                                Arraste uma foto de exame, receita ou PDF aqui para preencher a ficha automaticamente.
                            </p>
                        </>
                    )}
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Card className="md:col-span-2">
                    <CardContent className="space-y-5">
                        <TextArea label="APAE I (Data/Resumo)" value={data.apae1} onChange={(e) => onChange('apae1', e.target.value)} className="h-20" />
                        <TextArea label="APAE II (Data/Resumo)" value={data.apae2} onChange={(e) => onChange('apae2', e.target.value)} className="h-20" />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="space-y-4">
                        <Input label="USG 1T" value={data.usg_1t} onChange={(e) => onChange('usg_1t', e.target.value)} />
                        <Input label="USG Morfológico" value={data.usg_morf} onChange={(e) => onChange('usg_morf', e.target.value)} />
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardContent>
                        <TextArea
                            label="Último USG / Exames Gerais"
                            value={data.exames_comp}
                            onChange={(e) => onChange('exames_comp', e.target.value)}
                            className="h-32 font-mono text-xs bg-slate-50"
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
