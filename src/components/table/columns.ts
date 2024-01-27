import type { ColumnDef } from '@tanstack/vue-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Applicants {
  ApplicantID: string
  FileName:string
  SkillRating: number
  WorkExperienceRating: number
  EducationRating: number
  CustomRating : number
  TotalScore: number
}

export const columns: ColumnDef<Applicants>[] = [
  {
    accessorKey: 'ApplicantID',
    header: 'Id',
  },
  {
    accessorKey: 'FileName',
    header: 'Name',
  },
  {
    accessorKey: 'SkillRating',
    header: 'Skills',
  },
  {
    accessorKey: 'WorkExperienceRating',
    header: 'Experience',
  },
  {
    accessorKey: 'EducationRating',
    header: 'Education',
  },
  {
    accessorKey: 'CustomRating',
    header: 'Custom Critera',
  },
  {
    accessorKey: 'TotalScore',
    header: 'Total',
  },
]