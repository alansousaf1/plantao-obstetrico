import { useState } from 'react';
import { INITIAL_PATIENT_DATA } from '../types';
import type { PatientData } from '../types';

export function usePatientData() {
    const [data, setData] = useState<PatientData>(INITIAL_PATIENT_DATA);

    const updateField = (field: keyof PatientData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const updateAll = (newData: Partial<PatientData>) => {
        setData(prev => ({ ...prev, ...newData }));
    };

    return { data, updateField, updateAll };
}
