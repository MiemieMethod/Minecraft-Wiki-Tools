/*
 * The MIT License
 *
 * Copyright 2017 Jocopa3.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

package datachart;

import java.awt.Color;

/**
 *
 * @author Jocopa3
 */
public class ObtainEnum {
    private String type;
    private String desc;
    private int[] color;
    private boolean isDefault = false;
    private transient Color colorVal;
    
    public String getType() {
        return type;
    }
    
    public String getDescription() {
        return desc;
    }
    
    public Color getColor() {
        if(colorVal == null) {
            colorVal = new Color(color[0], color[1], color[2]);
        }
        
        return colorVal;
    }
    
    public boolean isDefault() {
        return isDefault;
    }
}
