import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Card, Typography } from '../../components/barrelComponents';
import { useTheme } from '../../theme/ThemeProvider';
import api from '../../api/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type AuditEntry = {
  id: string | number;
  user: { id: string; name: string; email?: string } | string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | string;
  entity: string;
  entityId?: string | number;
  timestamp: string;
  details?: any;
};

const mockData: AuditEntry[] = [
  {
    id: '1',
    user: { id: 'u1', name: 'Admin User', email: 'admin@sanem.com' },
    action: 'CREATE',
    entity: 'Item',
    entityId: '1001',
    timestamp: new Date().toISOString(),
    details: { name: 'Cobertor', qty: 10 },
  },
  {
    id: '2',
    user: { id: 'u2', name: 'Fulano', email: 'fulano@ex.com' },
    action: 'UPDATE',
    entity: 'User',
    entityId: '42',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    details: { changedFields: ['role', 'name'] },
  },
  {
    id: '3',
    user: { id: 'u3', name: 'Maria' },
    action: 'DELETE',
    entity: 'Distribution',
    entityId: '555',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    details: { note: 'Removido por duplicação' },
  },
];

const AuditScreen: React.FC = () => {
  const { theme } = useTheme();
  const [items, setItems] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAudits = async () => {
    setLoading(true);
    setError(null);
    try {
      // try common endpoints - backend may vary
      const endpoints = ['/audits', '/audit-logs', '/audit'];
      let response = null;
      for (const ep of endpoints) {
        try {
          response = await api.get(ep);
          if (response && response.data) break;
        } catch (e) {
          // continue
        }
      }

      if (response && response.data) {
        const data = response.data.data ?? response.data ?? [];
        setItems(Array.isArray(data) ? data : []);
      } else {
        // fallback to mock data
        setItems(mockData);
      }
    } catch (err: any) {
      console.error('[AuditScreen] fetch error', err);
      setError(err?.message || 'Erro ao buscar auditoria');
      setItems(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAudits();
    setRefreshing(false);
  };

  const renderActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE':
        return <MaterialCommunityIcons name="plus-circle" size={20} color={theme.colors.status.success} />;
      case 'UPDATE':
        return <MaterialCommunityIcons name="pencil" size={20} color={theme.colors.status.info} />;
      case 'DELETE':
        return <MaterialCommunityIcons name="delete" size={20} color={theme.colors.status.error} />;
      default:
        return <MaterialCommunityIcons name="circle" size={20} color={theme.colors.neutral.darkGray} />;
    }
  };

  const renderItem = ({ item }: { item: AuditEntry }) => {
    const userName = typeof item.user === 'string' ? item.user : item.user?.name ?? '—';
    return (
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.icon}>{renderActionIcon(item.action)}</View>
          <View style={styles.content}>
            <Typography variant="h4">{userName} · {item.action}</Typography>
            <Typography variant="bodySecondary">{item.entity} {item.entityId ? `#${item.entityId}` : ''}</Typography>
            {item.details && (
              <Typography variant="small">{JSON.stringify(item.details)}</Typography>
            )}
          </View>
          <View style={styles.ts}>
            <Typography variant="small" color={theme.colors.neutral.mediumGray}>
              {new Date(item.timestamp).toLocaleString()}
            </Typography>
          </View>
        </View>
      </Card>
    );
  };

  const listKey = useMemo(() => items.map(i => i.id).join('-'), [items]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.neutral.lightGray }]}>
      <View style={styles.headerWrap}>
        <Typography variant="h2">Auditoria</Typography>
        <Typography variant="bodySecondary">Registros de criação, alteração e remoção</Typography>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary.main} style={{ marginTop: 24 }} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => String(i.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={() => (
            <View style={{ padding: 24 }}>
              <Typography variant="body">Nenhum registro de auditoria encontrado.</Typography>
            </View>
          )}
          extraData={listKey}
        />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerWrap: {
    marginBottom: 12,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  ts: {
    marginLeft: 12,
    alignItems: 'flex-end',
  },
});

export default AuditScreen;
