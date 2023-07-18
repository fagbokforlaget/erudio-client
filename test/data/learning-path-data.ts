import { LearningPathDto } from '../../src/learning-path/dto/learning-path.dto';

export const learningPath: LearningPathDto = {
  id: 'b942d4de-921c-4406-abbd-464dabb7b323',
  name: 'name',
  slug: 'slug',
  status: 'status',
  createdBy: 'created_by',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  learningPathElements: [
    {
      id: 'id',
      namespaceId: 'namespaceId',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  ],
  tags: [],
  localizations: [
    { locale: 'locale123', content: { con1: 'con1', con2: 'con2' } },
    { locale: 'locale456', content: { con3: 'con4', con5: 'con6' } },
  ],
};
