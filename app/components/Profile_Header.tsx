import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface ProfileHeaderProps {
  name: string;
  age?: number;
  location?: string;
  avatarUri?: string;
  memberSince?: string;

  allergyCount?: number;
  symptomsTracked?: number;
  safeDaysCount?: number;
  emergencyContact?: string;

  hasEpiPen?: boolean;
  severityLevel?: 'mild' | 'moderate' | 'severe';

  isCurrentUser?: boolean;
  onEditProfile?: () => void;
  onEmergencyContact?: () => void;
  onAvatarPress?: () => void;
  onShareProfile?: () => void;
  onSettingsPress?: () => void;

  showStats?: boolean;
  showMedicalBadges?: boolean;
  variant?: 'default' | 'minimal' | 'medical';
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  age,
  location,
  avatarUri,
  memberSince,
  allergyCount = 0,
  symptomsTracked = 0,
  safeDaysCount = 0,
  emergencyContact,
  hasEpiPen = false,
  severityLevel = 'mild',
  isCurrentUser = false,
  onEditProfile,
  onEmergencyContact,
  onAvatarPress,
  onShareProfile,
  onSettingsPress,
  showStats = true,
  showMedicalBadges = true,
  variant = 'default',
}) => {

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'mild': return '#4CAF50';
      case 'moderate': return '#FF9800';
      case 'severe': return '#F44336';
      default: return '#4CAF50';
    }
  };

  const StatItem = ({ label, count, icon }: { label: string; count: number; icon: string }) => (
    <TouchableOpacity style={styles.statItem}>
      <View style={styles.statIconContainer}>
        <Icon name={icon} size={20} color="#6B73FF" />
      </View>
      <Text style={styles.statCount}>{formatCount(count)}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const MedicalBadges = () => (
    showMedicalBadges && (
      <View style={styles.badgesContainer}>
        {hasEpiPen && (
          <View style={styles.epiPenBadge}>
            <Icon name="medical" size={14} color="#fff" />
            <Text style={styles.badgeText}>EpiPen</Text>
          </View>
        )}
        <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(severityLevel) }]}>
          <Text style={styles.badgeText}>{severityLevel.charAt(0).toUpperCase() + severityLevel.slice(1)}</Text>
        </View>
      </View>
    )
  );

  const ActionButtons = () => (
    <View style={styles.actionsContainer}>
      {isCurrentUser ? (
        <>
          <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
            <Icon name="create-outline" size={16} color="#6B73FF" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emergencyButton} onPress={onEmergencyContact}>
            <Icon name="call" size={16} color="#fff" />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.shareButton} onPress={onShareProfile}>
          <Icon name="share-outline" size={16} color="#6B73FF" />
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.settingsButton} onPress={onSettingsPress}>
        <Icon name="settings-outline" size={16} color="#666" />
      </TouchableOpacity>
    </View>
  );

  if (variant === 'minimal') {
    return (
      <View style={styles.minimalContainer}>
        <TouchableOpacity onPress={onAvatarPress}>
          <Image
            source={{ uri: avatarUri || 'https://via.placeholder.com/60' }}
            style={styles.minimalAvatar}
          />
        </TouchableOpacity>
        <View style={styles.minimalInfo}>
          <Text style={styles.minimalName}>{name}</Text>
          <Text style={styles.minimalAge}>{age ? `${age} years old` : 'Age not specified'}</Text>
        </View>
        <MedicalBadges />
      </View>
    );
  }

  if (variant === 'medical') {
    return (
      <View style={styles.medicalContainer}>
        <View style={styles.medicalHeader}>
          <TouchableOpacity onPress={onAvatarPress}>
            <Image
              source={{ uri: avatarUri || 'https://via.placeholder.com/80' }}
              style={styles.medicalAvatar}
            />
          </TouchableOpacity>

          <View style={styles.medicalInfo}>
            <Text style={styles.medicalName}>{name}</Text>
            {age && <Text style={styles.medicalAge}>Age: {age}</Text>}
            <MedicalBadges />
          </View>

          <TouchableOpacity style={styles.emergencyButtonLarge} onPress={onEmergencyContact}>
            <Icon name="call" size={20} color="#fff" />
            <Text style={styles.emergencyText}>SOS</Text>
          </TouchableOpacity>
        </View>

        {emergencyContact && (
          <View style={styles.emergencyContactInfo}>
            <Icon name="person" size={16} color="#666" />
            <Text style={styles.emergencyContactText}>Emergency: {emergencyContact}</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.profileRow}>
          <TouchableOpacity onPress={onAvatarPress}>
            <Image
              source={{ uri: avatarUri || 'https://via.placeholder.com/100' }}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>{name}</Text>

            <View style={styles.basicInfo}>
              {age && <Text style={styles.infoText}>{age} years old</Text>}
              {location && (
                <View style={styles.locationContainer}>
                  <Icon name="location-outline" size={14} color="#666" />
                  <Text style={styles.infoText}>{location}</Text>
                </View>
              )}
            </View>

            <MedicalBadges />
          </View>
        </View>

        {memberSince && (
          <View style={styles.memberInfo}>
            <Icon name="calendar-outline" size={14} color="#666" />
            <Text style={styles.memberText}>Member since {memberSince}</Text>
          </View>
        )}

        <ActionButtons />
      </View>

      {showStats && (
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Tracking Overview</Text>
          <View style={styles.statsContainer}>
            <StatItem label="Allergies" count={allergyCount} icon="warning-outline" />
            <StatItem label="Symptoms" count={symptomsTracked} icon="pulse-outline" />
            <StatItem label="Safe Days" count={safeDaysCount} icon="checkmark-circle-outline" />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width:'100%'
  },

  // Header Section
  headerSection: {
    backgroundColor: '#f8f9ff',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  profileRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  // Avatar Styles
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },

  // Profile Info
  profileInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  basicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Member Info
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  memberText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },

  // Medical Badges
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  epiPenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Action Buttons
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#6B73FF',
    gap: 8,
  },
  editButtonText: {
    color: '#6B73FF',
    fontSize: 16,
    fontWeight: '600',
  },
  emergencyButton: {
    backgroundColor: '#FF4444',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#6B73FF',
    gap: 8,
  },
  shareButtonText: {
    color: '#6B73FF',
    fontSize: 16,
    fontWeight: '600',
  },
  settingsButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Stats Section
  statsSection: {
    padding: 20,
    width: '100%', // Ensure full width
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },

  // Minimal Variant
  minimalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    width: '100%', // Ensure full width
  },
  minimalAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  minimalInfo: {
    flex: 1,
    marginLeft: 12,
  },
  minimalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  minimalAge: {
    fontSize: 14,
    color: '#666',
  },

  medicalContainer: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FF4444',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    width: width - 32,
  },
  medicalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  medicalInfo: {
    flex: 1,
    marginLeft: 12,
  },
  medicalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  medicalAge: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  emergencyButtonLarge: {
    backgroundColor: '#FF4444',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignItems: 'center',
    minWidth: 60,
  },
  emergencyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  emergencyContactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  emergencyContactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});

export default ProfileHeader;