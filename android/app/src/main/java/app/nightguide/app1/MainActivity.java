package app.nightguide.app1;

import android.os.Bundle;
import com.facebook.react.ReactFragmentActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.content.Intent;

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

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
