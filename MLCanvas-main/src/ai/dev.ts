'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/explain-individual-prediction.ts';
import '@/ai/flows/recommend-model.ts';
