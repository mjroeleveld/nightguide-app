package com.nightguideapp;

import android.os.Bundle;
import com.facebook.react.ReactFragmentActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactFragmentActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        SplashScreen.show(this);
        return "nightguideApp";
    }
}
