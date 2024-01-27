import type { ColumnDef } from '@tanstack/vue-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Applicants {
  id: string
  name:string
  skills: number
  experience: number
  education: number
  custom : number
  total: number
}

export const columns: ColumnDef<Applicants>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'skills',
    header: 'Skills',
  },
  {
    accessorKey: 'experience',
    header: 'Experience',
  },
  {
    accessorKey: 'education',
    header: 'Education',
  },
  {
    accessorKey: 'custom',
    header: 'Custom Critera',
  },
  {
    accessorKey: 'total',
    header: 'Total',
  },
]