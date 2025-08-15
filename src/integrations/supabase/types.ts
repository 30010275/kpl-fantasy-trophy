export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      fantasy_team_players: {
        Row: {
          created_at: string | null
          fantasy_team_id: string
          gameweek_id: string
          id: string
          is_captain: boolean | null
          is_starting: boolean | null
          is_vice_captain: boolean | null
          player_id: string
          points: number | null
          position_order: number | null
        }
        Insert: {
          created_at?: string | null
          fantasy_team_id: string
          gameweek_id: string
          id?: string
          is_captain?: boolean | null
          is_starting?: boolean | null
          is_vice_captain?: boolean | null
          player_id: string
          points?: number | null
          position_order?: number | null
        }
        Update: {
          created_at?: string | null
          fantasy_team_id?: string
          gameweek_id?: string
          id?: string
          is_captain?: boolean | null
          is_starting?: boolean | null
          is_vice_captain?: boolean | null
          player_id?: string
          points?: number | null
          position_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fantasy_team_players_fantasy_team_id_fkey"
            columns: ["fantasy_team_id"]
            isOneToOne: false
            referencedRelation: "fantasy_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fantasy_team_players_gameweek_id_fkey"
            columns: ["gameweek_id"]
            isOneToOne: false
            referencedRelation: "gameweeks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fantasy_team_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      fantasy_teams: {
        Row: {
          budget_remaining: number | null
          created_at: string | null
          free_transfers: number | null
          gameweek_points: number | null
          id: string
          name: string
          total_points: number | null
          transfers_made: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          budget_remaining?: number | null
          created_at?: string | null
          free_transfers?: number | null
          gameweek_points?: number | null
          id?: string
          name: string
          total_points?: number | null
          transfers_made?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          budget_remaining?: number | null
          created_at?: string | null
          free_transfers?: number | null
          gameweek_points?: number | null
          id?: string
          name?: string
          total_points?: number | null
          transfers_made?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fantasy_teams_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fixtures: {
        Row: {
          away_score: number | null
          away_team_id: string
          created_at: string | null
          gameweek_id: string
          home_score: number | null
          home_team_id: string
          id: string
          is_finished: boolean | null
          kickoff_time: string
          updated_at: string | null
        }
        Insert: {
          away_score?: number | null
          away_team_id: string
          created_at?: string | null
          gameweek_id: string
          home_score?: number | null
          home_team_id: string
          id?: string
          is_finished?: boolean | null
          kickoff_time: string
          updated_at?: string | null
        }
        Update: {
          away_score?: number | null
          away_team_id?: string
          created_at?: string | null
          gameweek_id?: string
          home_score?: number | null
          home_team_id?: string
          id?: string
          is_finished?: boolean | null
          kickoff_time?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fixtures_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "kpl_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixtures_gameweek_id_fkey"
            columns: ["gameweek_id"]
            isOneToOne: false
            referencedRelation: "gameweeks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixtures_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "kpl_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      gameweeks: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          is_current: boolean | null
          is_finished: boolean | null
          name: string
          number: number
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          is_current?: boolean | null
          is_finished?: boolean | null
          name: string
          number: number
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          is_current?: boolean | null
          is_finished?: boolean | null
          name?: string
          number?: number
          start_date?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      kpl_teams: {
        Row: {
          created_at: string | null
          founded_year: number | null
          id: string
          logo_url: string | null
          name: string
          short_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          founded_year?: number | null
          id?: string
          logo_url?: string | null
          name: string
          short_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          founded_year?: number | null
          id?: string
          logo_url?: string | null
          name?: string
          short_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      player_performances: {
        Row: {
          assists: number | null
          bonus_points: number | null
          clean_sheet: boolean | null
          created_at: string | null
          fixture_id: string
          gameweek_id: string
          goals: number | null
          id: string
          minutes_played: number | null
          own_goals: number | null
          penalties_missed: number | null
          penalties_saved: number | null
          player_id: string
          points: number | null
          red_cards: number | null
          saves: number | null
          updated_at: string | null
          yellow_cards: number | null
        }
        Insert: {
          assists?: number | null
          bonus_points?: number | null
          clean_sheet?: boolean | null
          created_at?: string | null
          fixture_id: string
          gameweek_id: string
          goals?: number | null
          id?: string
          minutes_played?: number | null
          own_goals?: number | null
          penalties_missed?: number | null
          penalties_saved?: number | null
          player_id: string
          points?: number | null
          red_cards?: number | null
          saves?: number | null
          updated_at?: string | null
          yellow_cards?: number | null
        }
        Update: {
          assists?: number | null
          bonus_points?: number | null
          clean_sheet?: boolean | null
          created_at?: string | null
          fixture_id?: string
          gameweek_id?: string
          goals?: number | null
          id?: string
          minutes_played?: number | null
          own_goals?: number | null
          penalties_missed?: number | null
          penalties_saved?: number | null
          player_id?: string
          points?: number | null
          red_cards?: number | null
          saves?: number | null
          updated_at?: string | null
          yellow_cards?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "player_performances_fixture_id_fkey"
            columns: ["fixture_id"]
            isOneToOne: false
            referencedRelation: "fixtures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_performances_gameweek_id_fkey"
            columns: ["gameweek_id"]
            isOneToOne: false
            referencedRelation: "gameweeks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_performances_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          created_at: string | null
          id: string
          name: string
          photo_url: string | null
          position: string
          price: number
          status: string | null
          team_id: string
          total_points: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          photo_url?: string | null
          position: string
          price?: number
          status?: string | null
          team_id: string
          total_points?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          photo_url?: string | null
          position?: string
          price?: number
          status?: string | null
          team_id?: string
          total_points?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "kpl_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
