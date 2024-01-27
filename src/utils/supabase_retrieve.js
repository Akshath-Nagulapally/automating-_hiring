import { supabase } from '../supabase'

let { data: ApplicantRatings, error } = await supabase
  .from('ApplicantRatings')
  .select('*')


