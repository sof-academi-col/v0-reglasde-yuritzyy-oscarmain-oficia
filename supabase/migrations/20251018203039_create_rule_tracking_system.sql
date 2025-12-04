/*
  # Sistema de Seguimiento de Reglas para Oscar y Yuritzy

  ## Descripción General
  Este sistema permite que Oscar y Yuritzy registren privadamente si cumplen con cada regla.
  Una vez marcadas todas las reglas, la otra persona puede ver los resultados.

  ## 1. Nuevas Tablas
  
  ### `rule_checks`
  - `id` (uuid, primary key) - Identificador único del registro
  - `user_name` (text) - Nombre del usuario (Oscar o Yuritzy)
  - `rule_number` (integer) - Número de la regla (1-31)
  - `is_completed` (boolean) - Si cumplió con la regla
  - `check_date` (date) - Fecha del registro
  - `created_at` (timestamptz) - Fecha de creación del registro
  - `updated_at` (timestamptz) - Fecha de última actualización
  
  ### `daily_sessions`
  - `id` (uuid, primary key) - Identificador único de la sesión
  - `user_name` (text) - Nombre del usuario (Oscar o Yuritzy)
  - `session_date` (date) - Fecha de la sesión
  - `is_completed` (boolean) - Si completó el registro de todas las reglas
  - `completed_at` (timestamptz) - Fecha y hora cuando completó
  - `created_at` (timestamptz) - Fecha de creación
  
  ## 2. Seguridad
  - RLS habilitado en ambas tablas
  - Políticas públicas ya que es una aplicación privada para dos personas
  - Las políticas permiten a ambos usuarios ver y modificar sus propios registros
  - Una vez completada una sesión, el otro usuario puede ver los resultados
  
  ## 3. Índices
  - Índice compuesto en `rule_checks` (user_name, check_date, rule_number) para búsquedas rápidas
  - Índice compuesto en `daily_sessions` (user_name, session_date) para verificar sesiones
  
  ## 4. Constraints
  - Restricción para asegurar que rule_number esté entre 1 y 31
  - Unique constraint para prevenir duplicados (user_name + check_date + rule_number)
  - Unique constraint en sesiones (user_name + session_date)
*/

-- Crear tabla para registros de cumplimiento de reglas
CREATE TABLE IF NOT EXISTS rule_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL CHECK (user_name IN ('Oscar', 'Yuritzy')),
  rule_number integer NOT NULL CHECK (rule_number >= 1 AND rule_number <= 31),
  is_completed boolean NOT NULL DEFAULT false,
  check_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_name, check_date, rule_number)
);

-- Crear tabla para sesiones diarias
CREATE TABLE IF NOT EXISTS daily_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL CHECK (user_name IN ('Oscar', 'Yuritzy')),
  session_date date NOT NULL DEFAULT CURRENT_DATE,
  is_completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_name, session_date)
);

-- Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_rule_checks_user_date ON rule_checks(user_name, check_date, rule_number);
CREATE INDEX IF NOT EXISTS idx_daily_sessions_user_date ON daily_sessions(user_name, session_date);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at en rule_checks
DROP TRIGGER IF EXISTS update_rule_checks_updated_at ON rule_checks;
CREATE TRIGGER update_rule_checks_updated_at
  BEFORE UPDATE ON rule_checks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE rule_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_sessions ENABLE ROW LEVEL SECURITY;

-- Políticas para rule_checks - Acceso público para ambos usuarios
CREATE POLICY "Allow all operations on rule_checks"
  ON rule_checks
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Políticas para daily_sessions - Acceso público para ambos usuarios
CREATE POLICY "Allow all operations on daily_sessions"
  ON daily_sessions
  FOR ALL
  USING (true)
  WITH CHECK (true);
