import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import {google} from "@ai-sdk/google";

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': google('gemini-2.0-flash'),
        'chat-model-reasoning': wrapLanguageModel({
          model: google('gemini-2.0-flash'),
          middleware: extractReasoningMiddleware({ tagName: 'reasoning' }),
        }),
        'title-model': google('gemini-2.0-flash'),
        'artifact-model': google('gemini-2.0-flash'),
      },
      imageModels: {
        'small-model': xai.image('gemini-2.0-flash'),
      },
    });
