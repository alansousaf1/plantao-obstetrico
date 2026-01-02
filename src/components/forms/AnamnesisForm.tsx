import { useState } from 'react';
import type { PatientData, AppMode } from '../../types';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles, Bot, PenTool } from 'lucide-react';
import { generateQuestions, generateAnamnesisText } from '../../services/ai';

interface Props {
    data: PatientData;
    onChange: (field: keyof PatientData, value: string) => void;
    mode: AppMode;
}

export const AnamnesisForm = ({ data, onChange, mode }: Props) => {
    const [questions, setQuestions] = useState<string[]>([]);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [loadingText, setLoadingText] = useState(false);

    const handleGenerateQuestions = async () => {
        if (!data.qp) return;
        setLoadingQuestions(true);
        try {
            const qs = await generateQuestions(data.qp);
            setQuestions(qs);
            setAnswers({});
        } catch (error) {
            alert("Erro ao gerar perguntas.");
        } finally {
            setLoadingQuestions(false);
        }
    };

    const handleGenerateText = async () => {
        const qaPairs = questions.map(q => ({ question: q, answer: answers[q] || '' })).filter(pair => pair.answer);
        if (qaPairs.length === 0) {
            alert("Responda pelo menos uma pergunta.");
            return;
        }

        setLoadingText(true);
        try {
            const text = await generateAnamnesisText(data.qp, qaPairs);
            onChange('hda', text);
            setQuestions([]); // Clear after success
        } catch (error) {
            alert("Erro ao gerar texto.");
        } finally {
            setLoadingText(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Left Column: Input & Questions */}
            <div className="space-y-6">
                <Card className="bg-blue-50/30 border-blue-100">
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Input
                                label="Queixa Principal (QP)"
                                value={data.qp}
                                onChange={(e) => onChange('qp', e.target.value)}
                                placeholder="Ex: SANGRAMENTO VAGINAL"
                                className="font-bold text-lg py-4 border-blue-200 bg-white"
                                onBlur={() => { if (!questions.length && data.qp) handleGenerateQuestions() }}
                            />
                            <div className="absolute top-7 right-2">
                                <Button
                                    variant="ghost"
                                    onClick={handleGenerateQuestions}
                                    isLoading={loadingQuestions}
                                    className="p-1 text-blue-600 hover:bg-blue-100 rounded-full"
                                >
                                    {!loadingQuestions && <Sparkles size={18} />}
                                </Button>
                            </div>
                        </div>

                        <p className="text-[10px] text-slate-400 pl-1 mt-1">
                            *Digite a queixa e saia do campo para gerar perguntas automaticamente.
                        </p>
                    </CardContent>
                </Card>

                {questions.length > 0 && (
                    <Card className="border-blue-200 bg-white shadow-lg shadow-blue-500/10">
                        <div className="px-6 py-4 bg-blue-50/50 border-b border-blue-100 flex justify-between items-center">
                            <h3 className="text-xs font-bold text-blue-700 flex items-center gap-2">
                                <Bot size={14} /> PERGUNTAS SUGERIDAS
                            </h3>
                            <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full font-bold">IA</span>
                        </div>
                        <CardContent className="space-y-4">
                            {questions.map((q, idx) => (
                                <div key={idx}>
                                    <p className="text-xs font-semibold text-slate-600 mb-1">{q}</p>
                                    <Input
                                        placeholder="Digite a resposta..."
                                        value={answers[q] || ''}
                                        onChange={(e) => setAnswers(prev => ({ ...prev, [q]: e.target.value }))}
                                        className="text-xs"
                                    />
                                </div>
                            ))}

                            <Button
                                onClick={handleGenerateText}
                                isLoading={loadingText}
                                className="w-full mt-2"
                                icon={PenTool}
                            >
                                Gerar Texto da HDA
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Right Column: HDA */}
            <div className="space-y-6">
                <Card className="h-[400px] flex flex-col">
                    <CardContent className="h-full flex flex-col p-4">
                        <TextArea
                            label="História da Doença Atual (HDA)"
                            value={data.hda}
                            onChange={(e) => onChange('hda', e.target.value)}
                            placeholder="O texto da anamnese gerado pela IA aparecerá aqui..."
                            className="flex-grow font-medium leading-relaxed text-slate-700 bg-slate-50 border-slate-200"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="grid grid-cols-1 gap-4">
                        <Input label="HD (Negativas)" value={data.hd_neg} onChange={(e) => onChange('hd_neg', e.target.value)} />

                        {mode === 'GYN' && (
                            <div className="space-y-4">
                                <Input label="IS - Urinárias" value={data.is_urinarias} onChange={(e) => onChange('is_urinarias', e.target.value)} />
                                <Input label="IS - Hábito Intestinal" value={data.is_intestinal} onChange={(e) => onChange('is_intestinal', e.target.value)} />
                                <Input label="Queixas Ginecológicas" value={data.queixas_gyn} onChange={(e) => onChange('queixas_gyn', e.target.value)} />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
