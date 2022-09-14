export type Localisation = {
  readonly competencyAims: CompetencyAims;
  readonly globalAudio: GlobalAudio;
  readonly bannerImage: BannerImage;
  readonly useAnchorScrollNav: boolean;
  readonly altText: string;
  readonly copyright: string;
  readonly author: string;
  readonly linkToContentBlock: Record<string, unknown>;
  readonly relatedLinks: Record<string, unknown>;
};

export type Content = {
  readonly competencyAims: CompetencyAims;
  readonly globalAudio: GlobalAudio;
  readonly bannerImage: BannerImage;
  readonly useAnchorScrollNav: boolean;
  readonly altText: string;
  readonly copyright: string;
  readonly author: string;
  readonly readingTime: number;
};

export type Tag = {
  readonly source: string;
  readonly keyword: string;
};

export enum TypeEnum {
  COURSE = 'COURSE',
  UNIT = 'UNIT',
  LESSON = 'LESSON',
  DIRECTORY = 'DIRECTORY',
  OBJECT = 'OBJECT',
}

export type GlobalAudio = {
  readonly type: string;
  readonly value: string;
};

export type Aim = {
  readonly teacherOnly: boolean;
  readonly body: string;
  readonly title: string;
};

export type CompetencyAims = {
  readonly aims: Aim[];
  readonly hasCompetencyAims: boolean;
};

export type BannerImage = {
  readonly imageId: string;
  readonly altText: string;
  readonly copyright: string;
};

export class StructureNodeOutputDto {
  readonly namespace: string;
  readonly schemaId: string;
  readonly content: Content;
  readonly type: TypeEnum;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly id: string;
  localization: Record<string, Localisation>;
  readonly tags: Tag[];
}
