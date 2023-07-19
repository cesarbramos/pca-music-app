export interface Song {
    id: number
    album_id: number
    disc_number: number
    duration_ms: number
    name: string
    preview_url: string
    track_number: number
    created_at: string
    updated_at: string
    artist_id: number
    image?: string
    album_name?: string
    _fav?: boolean
  }
  