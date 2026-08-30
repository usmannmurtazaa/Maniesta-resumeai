import { ModernTemplate } from './modern';
import { ClassicTemplate } from './classic';
import { CreativeTemplate } from './creative';
import { TechTemplate } from './tech';
import { ElegantTemplate } from './elegant';

export const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  tech: TechTemplate,
  elegant: ElegantTemplate,
};

export type TemplateId = keyof typeof templates;
