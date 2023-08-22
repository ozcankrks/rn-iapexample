import {View, Text, Button, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as RNIap from 'react-native-iap';
const App = () => {
  const [success, setSuccess] = useState(false);
  async function fetchProducts() {
    try {
      const products = await RNIap.getProducts([
        'android.test.purchased',
        'android.test.canceled',
        'android.test.refunded',
        'android.test.item_unavailable',
      ]);
      console.log('Products:', products);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  }
  async function initializeIAP() {
    try {
      await RNIap.initConnection();
      console.log('Connection initialized');
      fetchProducts();
    } catch (error) {
      console.log('Error initializing connection:', error);
    }
  }
  useEffect(() => {
    initializeIAP();
  }, []);

  async function initiatePurchase(productId: string) {
    try {
      const purchase = await RNIap.requestPurchase(productId, false).then(
        purchase => {
          RNIap.finishTransaction(purchase, true);
        },
      );
      console.log('Purchase:', purchase);
    } catch (error) {
      console.log('Error initiating purchase:', error);
    }
  }
  async function restorePurchases() {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      console.log('Purchases:', purchases);
    } catch (error) {
      console.log('Error restoring purchases:', error);
    }
  }
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>App</Text>
      <Button
        title="test"
        onPress={() => {
          initiatePurchase('android.test.purchased');
        }}
      />
    </View>
  );
};

export default App;
