import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Role = 'Restaurant' | 'NGO';

type Donation = {
  id: number;
  food: string;
  quantity: string;
  status: 'Open' | 'Reserved' | 'Picked Up';
  eta?: string;
};

const ROLE_COPY: Record<Role, { headline: string; cta: string; helper: string }> = {
  Restaurant: {
    headline: 'Turn excess meals into community impact',
    cta: 'Post Donation',
    helper: 'Restaurants can list extra food with pickup windows and allergen info.',
  },
  NGO: {
    headline: 'Discover nearby meal donations in real time',
    cta: 'Reserve Pickup',
    helper: 'NGOs can reserve meals, track volunteer routes, and confirm delivery.',
  },
};

const INITIAL_DONATIONS: Donation[] = [
  { id: 1, food: 'Veg Biryani Packs', quantity: '30 meals', status: 'Open' },
  { id: 2, food: 'Fresh Sandwiches', quantity: '18 meals', status: 'Reserved', eta: 'ETA 25 mins' },
  { id: 3, food: 'Fruit Bowls', quantity: '12 packs', status: 'Picked Up', eta: 'Delivered 5:20 PM' },
];

export default function App(): React.JSX.Element {
  const [role, setRole] = useState<Role>('Restaurant');
  const [searchText, setSearchText] = useState('');

  const filteredDonations = useMemo(() => {
    if (!searchText.trim()) return INITIAL_DONATIONS;

    return INITIAL_DONATIONS.filter((item) =>
      item.food.toLowerCase().includes(searchText.trim().toLowerCase())
    );
  }, [searchText]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>MealBridge</Text>
        <Text style={styles.title}>{ROLE_COPY[role].headline}</Text>
        <Text style={styles.subtitle}>{ROLE_COPY[role].helper}</Text>

        <View style={styles.roleSwitcher}>
          {(Object.keys(ROLE_COPY) as Role[]).map((item) => {
            const selected = role === item;
            return (
              <Pressable
                key={item}
                onPress={() => setRole(item)}
                style={[styles.roleButton, selected && styles.roleButtonActive]}
              >
                <Text style={[styles.roleText, selected && styles.roleTextActive]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search food donations"
          style={styles.searchInput}
          placeholderTextColor="#719180"
        />

        <View style={styles.featureGrid}>
          <FeatureCard label="Smart Matching" value="AI-based NGO fit" />
          <FeatureCard label="Route Tracking" value="Volunteer ETA map" />
          <FeatureCard label="Safety" value="Expiry & allergen tags" />
          <FeatureCard label="Impact" value="Meals + CO₂ saved" />
        </View>

        <Text style={styles.sectionHeading}>Live Donations</Text>
        {filteredDonations.map((donation) => (
          <View key={donation.id} style={styles.donationCard}>
            <View>
              <Text style={styles.foodName}>{donation.food}</Text>
              <Text style={styles.quantity}>{donation.quantity}</Text>
            </View>
            <View style={styles.statusWrap}>
              <Text style={styles.status}>{donation.status}</Text>
              {donation.eta ? <Text style={styles.eta}>{donation.eta}</Text> : null}
            </View>
          </View>
        ))}

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>{ROLE_COPY[role].cta}</Text>
        </Pressable>

        <View style={styles.communityBox}>
          <Text style={styles.sectionHeading}>Additional Functionalities</Text>
          <Text style={styles.communityText}>• In-app chat between NGOs & restaurants</Text>
          <Text style={styles.communityText}>• Automated pickup reminders and no-show alerts</Text>
          <Text style={styles.communityText}>• Donation history, weekly insights, and tax-ready exports</Text>
          <Text style={styles.communityText}>• Multi-language support and accessibility mode</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type FeatureCardProps = {
  label: string;
  value: string;
};

function FeatureCard({ label, value }: FeatureCardProps): React.JSX.Element {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureLabel}>{label}</Text>
      <Text style={styles.featureValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F8F2',
  },
  container: {
    paddingHorizontal: 18,
    paddingVertical: 22,
    gap: 14,
  },
  logo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2A6541',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#173A25',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#3A654B',
    lineHeight: 20,
  },
  roleSwitcher: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 10,
  },
  roleButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#89A894',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  roleButtonActive: {
    backgroundColor: '#2F7A4C',
    borderColor: '#2F7A4C',
  },
  roleText: {
    color: '#29523A',
    fontWeight: '600',
  },
  roleTextActive: {
    color: '#fff',
  },
  searchInput: {
    marginTop: 4,
    borderColor: '#9AB5A4',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    color: '#173A25',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  featureCard: {
    backgroundColor: '#E9F3EA',
    borderRadius: 12,
    padding: 12,
    width: '48.5%',
    minHeight: 82,
    justifyContent: 'space-between',
  },
  featureLabel: {
    fontSize: 13,
    color: '#3B5D48',
    fontWeight: '600',
  },
  featureValue: {
    fontSize: 15,
    color: '#173A25',
    fontWeight: '800',
  },
  sectionHeading: {
    marginTop: 6,
    fontSize: 17,
    color: '#173A25',
    fontWeight: '800',
  },
  donationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#D5E4D7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#173A25',
  },
  quantity: {
    color: '#4D6B57',
    marginTop: 3,
  },
  statusWrap: {
    alignItems: 'flex-end',
  },
  status: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2F7A4C',
    backgroundColor: '#EAF4EC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  eta: {
    marginTop: 5,
    fontSize: 12,
    color: '#5E7C68',
  },
  primaryButton: {
    backgroundColor: '#1F6D42',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  communityBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D5E4D7',
    padding: 14,
    marginBottom: 24,
  },
  communityText: {
    color: '#30553F',
    lineHeight: 22,
    marginTop: 6,
  },
});
